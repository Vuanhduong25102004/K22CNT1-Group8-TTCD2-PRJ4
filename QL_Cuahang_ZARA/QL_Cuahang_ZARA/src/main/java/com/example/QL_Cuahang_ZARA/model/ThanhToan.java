package com.example.QL_Cuahang_ZARA.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Entity
@Table(name = "ThanhToan")
@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ThanhToan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int MaThanhToan;

    @ManyToOne
    @JoinColumn(name = "MaDonHang", nullable = false)
    private DonHang donHang;

    @ManyToOne
    @JoinColumn(name = "MaPhuongThuc", nullable = false)
    PhuongThucThanhToan phuongThucThanhToan;

    @Column(name = "NgayThanhToan")
    Date NgayThanhToan;

    String MaQR;

    @Column(nullable = false)
    String TrangThai = "Đang xử lý";
}
