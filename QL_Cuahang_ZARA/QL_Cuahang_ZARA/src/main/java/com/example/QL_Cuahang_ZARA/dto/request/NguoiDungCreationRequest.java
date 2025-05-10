package com.example.QL_Cuahang_ZARA.dto.request;

import com.example.QL_Cuahang_ZARA.model.NguoiDung;
import jakarta.persistence.Column;
import lombok.Getter;

import java.time.LocalDateTime;


public class NguoiDungCreationRequest {
    private String HoTen;
    private String email;
    private String MatKhau;

    public String getHoTen() {
        return HoTen;
    }

    public void setHoTen(String hoTen) {
        HoTen = hoTen;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMatKhau() {
        return MatKhau;
    }

    public void setMatKhau(String matKhau) {
        MatKhau = matKhau;
    }
}
