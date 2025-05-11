package com.example.QL_Cuahang_ZARA.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "GioHang")
public class GioHang {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer maGioHang;

    @ManyToOne
    @JoinColumn(name = "MaNguoiDung")
    private NguoiDung nguoiDung;

    private LocalDateTime ngayCapNhat;

    @PrePersist
    protected void onCreate() {
        this.ngayCapNhat = LocalDateTime.now();
    }

    public GioHang() {
    }

    public GioHang(Integer maGioHang) {
        this.maGioHang = maGioHang;
    }

    public Integer getMaGioHang() {
        return maGioHang;
    }

    public void setMaGioHang(Integer maGioHang) {
        this.maGioHang = maGioHang;
    }

    public NguoiDung getNguoiDung() {
        return nguoiDung;
    }

    public void setNguoiDung(NguoiDung nguoiDung) {
        this.nguoiDung = nguoiDung;
    }

    public LocalDateTime getNgayCapNhat() {
        return ngayCapNhat;
    }

    public void setNgayCapNhat(LocalDateTime ngayCapNhat) {
        this.ngayCapNhat = ngayCapNhat;
    }
}
