package com.example.QL_Cuahang_ZARA.controller;

import com.example.QL_Cuahang_ZARA.dto.request.AuthenticationRequest;
import com.example.QL_Cuahang_ZARA.dto.request.RefreshTokenRequest;
import com.example.QL_Cuahang_ZARA.dto.request.TokenValidationRequest;
import com.example.QL_Cuahang_ZARA.dto.response.AuthenticationResponse;
import com.example.QL_Cuahang_ZARA.model.NguoiDung;
import com.example.QL_Cuahang_ZARA.repository.NguoiDungRepository;
import com.example.QL_Cuahang_ZARA.service.AuthService;
import com.example.QL_Cuahang_ZARA.service.TokenBlackListService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthController {
    AuthService authService;
    NguoiDungRepository nguoiDungRepository;
    TokenBlackListService tokenBlackListService;

    //Endpoint login
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody AuthenticationRequest request){
        //Xác thực người dùng
        boolean isAuthenticated = authService.authenticate(request);

        if(isAuthenticated){
            NguoiDung nguoiDung = nguoiDungRepository.findByEmail(request.getEmail())
                    .orElseThrow(() -> new RuntimeException("Tài khoản không tòn tại."));

            String token = authService.createToken(nguoiDung);
            // Nếu đăng nhập thành công, trả về mã trạng thái 200 (OK) và thông báo
            return ResponseEntity.ok("Đăng nhập thành công.\n" + "Token: "+ token);
        } else {
            // Nếu đăng nhập thất bại, trả về mã trạng thái 401 (Unauthorized) và thông báo lỗi
            return ResponseEntity.status(401).body("Mật khẩu sai.");
        }
    }

    @PostMapping("/validate-token")
    public ResponseEntity<String> validateToken(@RequestBody TokenValidationRequest request) {
        String token = request.getToken();  // Lấy token từ request

        try {
            // Lấy email từ token
            String email = authService.extractEmail(token);

            // Xác thực token
            boolean isValid = authService.validateToken(token, email);

            if (isValid) {
                return ResponseEntity.ok("Token hợp lệ.");
            } else {
                return ResponseEntity.status(401).body("Token không hợp lệ hoặc hết hạn.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Token không hợp lệ hoặc hết hạn.");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(@RequestHeader("Authorization") String authHeader){
        if(authHeader != null && authHeader.startsWith("Bearer ")){
            String token = authHeader.substring(7);
            tokenBlackListService.blacklistToken(token);
            return ResponseEntity.ok("Đã đăng xuất thành công");
        }
        return  ResponseEntity.badRequest().body("Token không hợp lệ");
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<AuthenticationResponse> refreshToken(@RequestBody RefreshTokenRequest request) {
        AuthenticationResponse response = authService.refreshToken(request, true);
        if (response.isAuthenticated()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(401).body(response);
        }
    }
}
