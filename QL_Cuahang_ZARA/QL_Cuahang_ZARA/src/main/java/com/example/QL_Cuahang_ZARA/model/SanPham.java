package com.example.QL_Cuahang_ZARA.model;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "SanPham")
public class SanPham {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaSanPham")
    private Integer maSanPham;

    @Column(name = "TenSanPham", nullable = false, length = 100)
    private String tenSanPham;

    @Column(name = "MoTa", columnDefinition = "TEXT")
    private String moTa;

    // Thay Double bằng BigDecimal
    @Column(name = "Gia", precision = 10, scale = 2)
    private BigDecimal gia;

    @Column(name = "SoLuongTon")
    private Integer soLuongTon;

    @Column(name = "HinhAnh", length = 255)
    private String hinhAnh;

    // Getters and Setters
    public Integer getMaSanPham() {
        return maSanPham;
    }

    public void setMaSanPham(Integer maSanPham) {
        this.maSanPham = maSanPham;
    }

    public String getTenSanPham() {
        return tenSanPham;
    }

    public void setTenSanPham(String tenSanPham) {
        this.tenSanPham = tenSanPham;
    }

    public String getMoTa() {
        return moTa;
    }

    public void setMoTa(String moTa) {
        this.moTa = moTa;
    }

    public BigDecimal getGia() {
        return gia;
    }

    public void setGia(BigDecimal gia) {
        this.gia = gia;
    }

    public Integer getSoLuongTon() {
        return soLuongTon;
    }

    public void setSoLuongTon(Integer soLuongTon) {
        this.soLuongTon = soLuongTon;
    }

    public String getHinhAnh() {
        return hinhAnh;
    }

    public void setHinhAnh(String hinhAnh) {
        this.hinhAnh = hinhAnh;
    }
}