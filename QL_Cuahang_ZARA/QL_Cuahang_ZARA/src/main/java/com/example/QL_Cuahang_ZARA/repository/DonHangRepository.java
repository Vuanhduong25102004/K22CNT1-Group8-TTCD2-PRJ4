package com.example.QL_Cuahang_ZARA.repository;

import com.example.QL_Cuahang_ZARA.model.DonHang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DonHangRepository extends JpaRepository<DonHang, Integer> {
}
