package com.example.QL_Cuahang_ZARA.model;

import jakarta.persistence.*;

@Entity
@Table(name = "DanhMuc")
public class DanhMuc {
    @Id
    @Column(name = "MaDanhMuc", nullable = false, length = 50)
    private String maDanhMuc; // Thay đổi từ Integer sang String

    @Column(name = "TenDanhMuc", nullable = false, length = 100)
    private String tenDanhMuc;

    public DanhMuc() {
        // Constructor mặc định
    }

    public DanhMuc(String maDanhMuc) {
        this.maDanhMuc = maDanhMuc;
    }

    // Getters and Setters
    public String getMaDanhMuc() {
        return maDanhMuc;
    }

    public void setMaDanhMuc(String maDanhMuc) {
        this.maDanhMuc = maDanhMuc;
    }

    public String getTenDanhMuc() {
        return tenDanhMuc;
    }

    public void setTenDanhMuc(String tenDanhMuc) {
        this.tenDanhMuc = tenDanhMuc;
    }


}
