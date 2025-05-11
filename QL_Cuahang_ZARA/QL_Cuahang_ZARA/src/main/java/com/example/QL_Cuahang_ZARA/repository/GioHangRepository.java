package com.example.QL_Cuahang_ZARA.repository;

import com.example.QL_Cuahang_ZARA.model.GioHang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GioHangRepository extends JpaRepository<GioHang, Integer> {
    GioHang findByNguoiDung_MaNguoiDung(Integer maNguoiDung);
}

