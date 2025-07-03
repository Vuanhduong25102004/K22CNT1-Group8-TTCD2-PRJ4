package com.example.QL_Cuahang_ZARA.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "GioHang")
public class GioHang {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaGioHang")
    private Long maGioHang;

    @ManyToOne
    @JoinColumn(name = "MaNguoiDung", nullable = false)
    private NguoiDung nguoiDung;

    @Column(name = "NgayTao")
    private Date ngayTao;

    @Column(name = "NgayCapNhat")
    private Date ngayCapNhat;

    // Constructor mặc định
    public GioHang() {
    }

    @PrePersist
    public void prePersist() {
        Date now = new Date(); // Lấy thời gian hiện tại
        this.ngayTao = now; // Gán giá trị ngày tạo
        this.ngayCapNhat = now; // Gán giá trị ngày cập nhật
    }

    // Getters và Setters
    public Long getMaGioHang() {
        return maGioHang;
    }

    public void setMaGioHang(Long maGioHang) {
        this.maGioHang = maGioHang;
    }

    public NguoiDung getNguoiDung() {
        return nguoiDung;
    }

    public void setNguoiDung(NguoiDung nguoiDung) {
        this.nguoiDung = nguoiDung;
    }

    public Date getNgayTao() {
        return ngayTao;
    }

    public void setNgayTao(Date ngayTao) {
        this.ngayTao = ngayTao;
    }

    public Date getNgayCapNhat() {
        return ngayCapNhat;
    }

    public void setNgayCapNhat(Date ngayCapNhat) {
        this.ngayCapNhat = ngayCapNhat;
    }
}
