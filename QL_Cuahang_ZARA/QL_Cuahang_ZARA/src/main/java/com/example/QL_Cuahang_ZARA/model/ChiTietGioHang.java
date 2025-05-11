package com.example.QL_Cuahang_ZARA.model;

import jakarta.persistence.*;

@Entity
@Table(name = "ChiTietGioHang")
public class ChiTietGioHang {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaChiTietGioHang")
    private Long maChiTietGioHang;

    @ManyToOne
    @JoinColumn(name = "MaGioHang", nullable = false)
    private GioHang gioHang;

    @ManyToOne
    @JoinColumn(name = "MaSanPham", nullable = false)
    private SanPham sanPham;

    @Column(name = "SoLuong")
    private Integer soLuong;

    // Constructor mặc định
    public ChiTietGioHang() {
    }

    // Getters và Setters
    public Long getMaChiTietGioHang() {
        return maChiTietGioHang;
    }

    public void setMaChiTietGioHang(Long maChiTietGioHang) {
        this.maChiTietGioHang = maChiTietGioHang;
    }

    public GioHang getGioHang() {
        return gioHang;
    }

    public void setGioHang(GioHang gioHang) {
        this.gioHang = gioHang;
    }

    public SanPham getSanPham() {
        return sanPham;
    }

    public void setSanPham(SanPham sanPham) {
        this.sanPham = sanPham;
    }

    public Integer getSoLuong() {
        return soLuong;
    }

    public void setSoLuong(Integer soLuong) {
        this.soLuong = soLuong;
    }
}
