package com.example.QL_Cuahang_ZARA.service;

import com.example.QL_Cuahang_ZARA.dto.request.AuthenticationRequest;
import com.example.QL_Cuahang_ZARA.dto.request.RefreshTokenRequest;
import com.example.QL_Cuahang_ZARA.dto.response.AuthenticationResponse;
import com.example.QL_Cuahang_ZARA.model.NguoiDung;
import com.example.QL_Cuahang_ZARA.repository.NguoiDungRepository;
import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.StringJoiner;

@Service
public class AuthService {

    @Autowired
    private NguoiDungRepository nguoiDungRepository;
    @Autowired
    private TokenBlackListService tokenBlackListService;

    @Value("${app.secret.key}")
    private String SECRET_KEY;

    //Xác thực người dùng khi đăng nhập
    public boolean authenticate(AuthenticationRequest request){
        //Kiểm tra xem email có tồn tại trong hệ thống hay không
        NguoiDung nguoiDung = nguoiDungRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Tài khoản không tồn tại."));

        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);

        //Kiểm tra mật khẩu
        if(passwordEncoder.matches(request.getMatKhau(), nguoiDung.getMatKhau())){
            String token = createToken(nguoiDung);
            return true;
        }else{
            return false;
        }
    }

    //Tạo JWT Token
    public String createToken(NguoiDung nguoiDung) {
        try {
            // Tạo claims cho token
            JWTClaimsSet claimsSet = new JWTClaimsSet.Builder()
                    .issuer("VuDuong")
                    .subject(nguoiDung.getEmail())// Thêm role vào claims
                    .issueTime(new Date())
                    .claim("scope",buildScope(nguoiDung))
                    .expirationTime(new Date(
                            Instant.now().plus(1, ChronoUnit.HOURS).toEpochMilli())
                    )
                    .build();

            //Tạo một JWT object với HMAC signer
            SignedJWT signedJWT = new SignedJWT(
                    new JWSHeader(JWSAlgorithm.HS512),
                    claimsSet
            );

            // Ký JWT với secret key
            JWSSigner signer = new MACSigner(SECRET_KEY);
            signedJWT.sign(signer);

            return signedJWT.serialize();  // Trả về token đã ký
        } catch (Exception e) {
            throw new RuntimeException("Error while signing JWT", e);
        }
    }

    // Xác thực JWT token
    public boolean validateToken(String token, String email) {
        if (tokenBlackListService.isBlacklisted(token)) {
            return false;  // token đã bị blacklist
        }

        try {
            SignedJWT signedJWT = SignedJWT.parse(token);
            JWSVerifier verifier = new MACVerifier(SECRET_KEY);
            if (!signedJWT.verify(verifier)) {
                return false;
            }

            JWTClaimsSet claimsSet = signedJWT.getJWTClaimsSet();
            String subject = claimsSet.getSubject();

            return subject.equals(email) && !isTokenExpired(claimsSet);
        } catch (ParseException | JOSEException e) {
            throw new RuntimeException("Error while validating JWT", e);
        }
    }

    // Kiểm tra xem token có hết hạn chưa
    private boolean isTokenExpired(JWTClaimsSet claimsSet) {
        Date expirationTime = claimsSet.getExpirationTime();
        return expirationTime != null && expirationTime.before(new Date());
    }

    private boolean isTokenNearExpiry(JWTClaimsSet claimsSet, long thresholdMinutes) {
        Date expirationTime = claimsSet.getExpirationTime();
        if (expirationTime == null) return true; // Không rõ hạn => coi như cần refresh

        Instant expiryInstant = expirationTime.toInstant();
        Instant now = Instant.now();

        // Nếu thời gian còn lại nhỏ hơn ngưỡng threshold (phút), trả về true
        return expiryInstant.isBefore(now.plus(thresholdMinutes, ChronoUnit.MINUTES));
    }

    public AuthenticationResponse refreshToken(RefreshTokenRequest request, boolean forceRefresh) {
        String oldToken = request.getToken();

        try {
            SignedJWT signedJWT = SignedJWT.parse(oldToken);
            JWTClaimsSet claimsSet = signedJWT.getJWTClaimsSet();
            String email = claimsSet.getSubject();

            if (!validateToken(oldToken, email)) {
                return AuthenticationResponse.builder()
                        .token(null)
                        .authenticated(false)
                        .build();
            }

            boolean nearExpiry = isTokenNearExpiry(claimsSet, 5);

            if (!forceRefresh && !nearExpiry) {
                // Token còn hạn dài và không bắt buộc refresh => trả token cũ
                return AuthenticationResponse.builder()
                        .token(oldToken)
                        .authenticated(true)
                        .build();
            }

            // Bắt buộc hoặc token gần hết hạn => blacklist token cũ và tạo mới
            tokenBlackListService.blacklistToken(oldToken);

            NguoiDung nguoiDung = nguoiDungRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("Người dùng không tồn tại."));

            String newToken = createToken(nguoiDung);

            return AuthenticationResponse.builder()
                    .token(newToken)
                    .authenticated(true)
                    .build();

        } catch (Exception e) {
            return AuthenticationResponse.builder()
                    .token(null)
                    .authenticated(false)
                    .build();
        }
    }




    // Lấy email từ JWT
    public String extractEmail(String token) {
        try {
            SignedJWT signedJWT = SignedJWT.parse(token);
            return signedJWT.getJWTClaimsSet().getSubject();
        } catch (ParseException e) {
            throw new RuntimeException("Error while extracting email from JWT", e);
        }
    }

    private String buildScope(NguoiDung nguoiDung){
        StringJoiner stringJoiner = new StringJoiner(" ");
        // Kiểm tra Role của người dùng và thêm vào stringJoiner
        if (nguoiDung.getRole() != null) {
            stringJoiner.add(nguoiDung.getRole().name());  // Chỉ cần thêm tên Role
        }
        return stringJoiner.toString();
    }
}
