package com.example.QL_Cuahang_ZARA.repository;

import com.example.QL_Cuahang_ZARA.model.SanPham;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SanPhamRepository extends JpaRepository<SanPham, Integer> {
}
