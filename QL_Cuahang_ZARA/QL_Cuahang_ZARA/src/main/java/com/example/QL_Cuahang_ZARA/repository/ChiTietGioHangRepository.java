package com.example.QL_Cuahang_ZARA.repository;

import com.example.QL_Cuahang_ZARA.model.ChiTietGioHang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChiTietGioHangRepository extends JpaRepository<ChiTietGioHang, Integer> {
    List<ChiTietGioHang> findByGioHang_MaGioHang(Integer MaGioHang);
}
