package com.example.QL_Cuahang_ZARA.model;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "DonHang")
@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DonHang {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int maDonHang;

    @ManyToOne
    @JoinColumn(name = "MaNguoiDung", nullable = false)
    NguoiDung nguoiDung;

    BigDecimal TongTien;

    @ManyToOne
    @JoinColumn(name = "MaPhuongThuc", nullable = true)
    PhuongThucThanhToan phuongThucThanhToan;

    @Column(nullable = false)
    String TrangThaiThanhToan = "Chưa thanh toán";

    @Column(nullable = false)
    String TrangThaiDonHang = "Chờ xác nhận";

    @Column(name = "NgayDat")
    Date NgayDat;
}
