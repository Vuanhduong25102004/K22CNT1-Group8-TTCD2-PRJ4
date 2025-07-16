package com.example.QL_Cuahang_ZARA.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

@Entity
@Table(name = "ChiTietDonHang")
@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ChiTietDonHang {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int MaChiTiet;

    @ManyToOne
    @JoinColumn(name = "MaDonHang", nullable = false)
    DonHang donHang;

    @ManyToOne
    @JoinColumn(name = "MaSanPham", nullable = false)
    SanPham sanPham;

    int SoLuong;
    BigDecimal DonGia;
}
