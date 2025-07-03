package com.example.QL_Cuahang_ZARA.repository;


import com.example.QL_Cuahang_ZARA.model.GioHang;
import com.example.QL_Cuahang_ZARA.model.NguoiDung;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GioHangRepository extends JpaRepository<GioHang, Long> {
    GioHang findByNguoiDung_maNguoiDung(int maNguoiDung);

    GioHang findByNguoiDung(NguoiDung nguoiDung);
}
