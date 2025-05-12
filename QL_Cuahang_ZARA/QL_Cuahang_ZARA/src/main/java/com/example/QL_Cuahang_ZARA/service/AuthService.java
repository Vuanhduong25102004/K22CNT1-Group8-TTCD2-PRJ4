package com.example.QL_Cuahang_ZARA.service;

import com.example.QL_Cuahang_ZARA.dto.request.AuthenticationRequest;
import com.example.QL_Cuahang_ZARA.model.NguoiDung;
import com.example.QL_Cuahang_ZARA.repository.NguoiDungRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private NguoiDungRepository nguoiDungRepository;

    //Xác thực người dùng khi đăng nhập
    public boolean authenticate(AuthenticationRequest request){
        //Kiểm tra xem email có tồn tại trong hệ thống hay không
        NguoiDung nguoiDung = nguoiDungRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Tài khoản không tồn tại."));

        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);

        //Kiểm tra mật khẩu
        if(passwordEncoder.matches(request.getMatKhau(), nguoiDung.getMatKhau())){
            return true;
        }else{
            return false;
        }
    }
}
