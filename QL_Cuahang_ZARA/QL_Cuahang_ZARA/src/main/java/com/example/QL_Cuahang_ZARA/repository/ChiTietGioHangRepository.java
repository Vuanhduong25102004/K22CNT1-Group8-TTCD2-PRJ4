package com.example.QL_Cuahang_ZARA.repository;


import com.example.QL_Cuahang_ZARA.model.ChiTietGioHang;
import com.example.QL_Cuahang_ZARA.model.GioHang;
import com.example.QL_Cuahang_ZARA.model.SanPham;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ChiTietGioHangRepository extends JpaRepository<ChiTietGioHang, Long> {
    Optional<ChiTietGioHang> findByGioHangAndSanPham(GioHang gioHang, SanPham sanPham);
    List<ChiTietGioHang> findByGioHang(GioHang gioHang);
}