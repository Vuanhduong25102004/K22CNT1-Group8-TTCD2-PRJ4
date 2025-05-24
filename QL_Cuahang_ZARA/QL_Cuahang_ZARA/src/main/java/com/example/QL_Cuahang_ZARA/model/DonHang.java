package com.example.QL_Cuahang_ZARA.model;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import jakarta.persistence.*;

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
    int MaDonHang;

    @ManyToOne
    @JoinColumn(name = "MaNguoiDung", nullable = false)
    NguoiDung nguoiDung;

    double TongTien;

    @ManyToOne
    @JoinColumn(name = "MaPhuongThuc", nullable = false)
    PhuongThucThanhToan phuongThucThanhToan;

    String TrangThaiThanhToan;
    String TrangThaiDonHang;

    @Column(name = "NgayDat")
    Date NgayDat;
}
