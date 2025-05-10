package com.example.QL_Cuahang_ZARA.service;

import com.example.QL_Cuahang_ZARA.dto.request.NguoiDungCreationRequest;
import com.example.QL_Cuahang_ZARA.dto.request.NguoiDungUpdateRequest;
import com.example.QL_Cuahang_ZARA.model.NguoiDung;
import com.example.QL_Cuahang_ZARA.repository.NguoiDungRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.QL_Cuahang_ZARA.model.NguoiDung.Role;

import java.util.List;

@Service
public class NguoiDungService {
    @Autowired
    private NguoiDungRepository nguoiDungRepository;

    public NguoiDung createNguoiDung(NguoiDungCreationRequest request){
        if(nguoiDungRepository.existsByEmail(request.getEmail())){
            throw new RuntimeException("Email này đã tồn tại.");
        }
        NguoiDung nguoiDung = new NguoiDung();

        nguoiDung.setHoTen(request.getHoTen());
        nguoiDung.setEmail(request.getEmail());
        nguoiDung.setMatKhau(request.getMatKhau());

        return nguoiDungRepository.save(nguoiDung);
    }

        // update user
    public NguoiDung updateNguoiDung(Long MaNguoiDung, NguoiDungUpdateRequest request){
        NguoiDung nguoiDung = getNguoiDung(MaNguoiDung);

        // Kiểm tra xem email có thay đổi hay không
        if (request.getEmail() != null && !nguoiDung.getEmail().equals(request.getEmail())) {
            // Nếu email thay đổi, kiểm tra xem email mới đã tồn tại chưa
            if (nguoiDungRepository.existsByEmail(request.getEmail())) {
                throw new RuntimeException("Email này đã tồn tại.");
            }
            // Cập nhật email nếu không có vấn đề gì
            nguoiDung.setEmail(request.getEmail());
        }

        nguoiDung.setHoTen(request.getHoTen());
        nguoiDung.setMatKhau(request.getMatKhau());

        // Cập nhật Role nếu có thay đổi
        if (request.getRole() != null) {
            try {
                nguoiDung.setRole(Role.valueOf(request.getRole()));  // Chuyển đổi chuỗi thành enum Role
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
    public NguoiDung getNguoiDung(Long MaNguoiDung){
        return nguoiDungRepository.findById(MaNguoiDung).orElseThrow(() -> new RuntimeException("nguoi dung khong co"));
    }

        // delete user
    public void deleteNguoiDung(Long MaNguoiDung){
        nguoiDungRepository.deleteById(MaNguoiDung);
    }
}
