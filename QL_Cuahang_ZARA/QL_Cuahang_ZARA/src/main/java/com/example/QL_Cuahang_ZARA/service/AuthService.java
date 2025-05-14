package com.example.QL_Cuahang_ZARA.service;

import com.example.QL_Cuahang_ZARA.dto.request.AuthenticationRequest;
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

import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Service
public class AuthService {

    @Autowired
    private NguoiDungRepository nguoiDungRepository;

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
            String token = createToken(request.getEmail(), nguoiDung.getRole());
            return true;
        }else{
            return false;
        }
    }

    //Tạo JWT Token
    public String createToken(String email, NguoiDung.Role role) {
        try {
            // Tạo claims cho token
            JWTClaimsSet claimsSet = new JWTClaimsSet.Builder()
                    .issuer("VuDuong")
                    .subject(email)
                    .claim("role", role.name())  // Thêm role vào claims
                    .issueTime(new Date())
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
        try {
            // Giải mã JWT token
            SignedJWT signedJWT = SignedJWT.parse(token);

            // Kiểm tra chữ ký JWT
            JWSVerifier verifier = new MACVerifier(SECRET_KEY);
            if (!signedJWT.verify(verifier)) {
                return false;  // Nếu chữ ký không hợp lệ, trả về false
            }

            // Lấy thông tin claims từ token
            JWTClaimsSet claimsSet = signedJWT.getJWTClaimsSet();
            String subject = claimsSet.getSubject();

            // Kiểm tra xem subject có trùng với email và token có hết hạn chưa
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

    // Lấy email từ JWT
    public String extractEmail(String token) {
        try {
            SignedJWT signedJWT = SignedJWT.parse(token);
            return signedJWT.getJWTClaimsSet().getSubject();
        } catch (ParseException e) {
            throw new RuntimeException("Error while extracting email from JWT", e);
        }
    }
    public NguoiDung.Role getRoleByEmail(String email) {
        NguoiDung nguoiDung = nguoiDungRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Tài khoản không tồn tại."));
        return nguoiDung.getRole();  // Trả về Role của người dùng
    }
}
