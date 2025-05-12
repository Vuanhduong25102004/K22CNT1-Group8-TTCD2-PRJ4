package com.example.QL_Cuahang_ZARA.controller;

import com.example.QL_Cuahang_ZARA.dto.request.AuthenticationRequest;
import com.example.QL_Cuahang_ZARA.service.AuthService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthController {
    AuthService authService;

    //Endpoint login
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody AuthenticationRequest request){
        //Xác thực người dùng
        boolean isAuthenticated = authService.authenticate(request);

        if(isAuthenticated){
            // Nếu đăng nhập thành công, trả về mã trạng thái 200 (OK) và thông báo
            return ResponseEntity.ok("Đăng nhập thành công.");
        } else {
            // Nếu đăng nhập thất bại, trả về mã trạng thái 401 (Unauthorized) và thông báo lỗi
            return ResponseEntity.status(401).body("Mật khẩu sai.");
        }
    }
}
