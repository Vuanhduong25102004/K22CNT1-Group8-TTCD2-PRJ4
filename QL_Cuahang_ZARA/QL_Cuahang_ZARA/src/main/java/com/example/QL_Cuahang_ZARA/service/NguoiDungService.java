package com.example.QL_Cuahang_ZARA.service;

import com.example.QL_Cuahang_ZARA.dto.request.NguoiDungCreationRequest;
import com.example.QL_Cuahang_ZARA.dto.request.NguoiDungUpdateRequest;
import com.example.QL_Cuahang_ZARA.model.NguoiDung;
import com.example.QL_Cuahang_ZARA.repository.NguoiDungRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.QL_Cuahang_ZARA.model.NguoiDung.Role;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE , makeFinal = true)
public class NguoiDungService {
    NguoiDungRepository nguoiDungRepository;


    // tạo mới người dùng
    public NguoiDung createNguoiDung(NguoiDungCreationRequest request){
        NguoiDung nguoiDung = new NguoiDung();

        if(nguoiDungRepository.existsByEmail(request.getEmail())){
            throw new RuntimeException("Email này đã tồn tại.");
        }

        nguoiDung.setHoTen(request.getHoTen());
        nguoiDung.setEmail(request.getEmail());
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);

        nguoiDung.setMatKhau(passwordEncoder.encode(request.getMatKhau()));

        return nguoiDungRepository.save(nguoiDung);
    }

    public NguoiDung updateNguoiDung(Integer MaNguoiDung, NguoiDungUpdateRequest request){
        NguoiDung nguoiDung = getNguoiDung(MaNguoiDung);

        // Kiểm tra email mới
        if (request.getEmail() != null && !request.getEmail().trim().isEmpty() && !nguoiDung.getEmail().equals(request.getEmail())) {
            if (nguoiDungRepository.existsByEmail(request.getEmail())) {
                throw new RuntimeException("Email này đã tồn tại.");
            }
            nguoiDung.setEmail(request.getEmail());
        }

        nguoiDung.setHoTen(request.getHoTen());

        // Chỉ cập nhật mật khẩu nếu có nhập mới
        if (request.getMatKhau() != null && !request.getMatKhau().trim().isEmpty()) {
            PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
            nguoiDung.setMatKhau(passwordEncoder.encode(request.getMatKhau()));
        }

        // Cập nhật role nếu có
        if (request.getRole() != null) {
            try {
                nguoiDung.setRole(Role.valueOf(request.getRole()));
            } catch (IllegalArgumentException e) {
                throw new RuntimeException("Role không hợp lệ.");
            }
        }

        return nguoiDungRepository.save(nguoiDung);
    }

    //get all user
    public List<NguoiDung> getNguoiDung() {
        List<NguoiDung> nguoiDung = nguoiDungRepository.findAll();
        System.out.println("Số lượng người dùng: " + nguoiDung.size()); // Thêm log để kiểm tra dữ liệu
        return nguoiDung;
    }

    //get user by id
    @PostAuthorize("returnObject.email == authentication.name")
    public NguoiDung getNguoiDung(Integer MaNguoiDung){
        return nguoiDungRepository.findById(MaNguoiDung).orElseThrow(() -> new RuntimeException("nguoi dung khong co"));
    }

    // delete user
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteNguoiDung(Integer MaNguoiDung){
        nguoiDungRepository.deleteById(MaNguoiDung);
    }

    //get my info
    public NguoiDung getMyInfo(){
        var context = SecurityContextHolder.getContext();
        String name = context.getAuthentication().getName();

        NguoiDung nguoiDung = nguoiDungRepository.findByEmail(name).orElseThrow(() -> new RuntimeException("Người dùng không tồn tại"));

        return nguoiDung;
    }
}
