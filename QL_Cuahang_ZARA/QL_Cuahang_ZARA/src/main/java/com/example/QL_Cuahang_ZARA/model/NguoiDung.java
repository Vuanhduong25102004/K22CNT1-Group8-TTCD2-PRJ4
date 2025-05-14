package com.example.QL_Cuahang_ZARA.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Entity
@Table(name = "NguoiDung") // Tên bảng trong cơ sở dữ liệu

public class NguoiDung {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer maNguoiDung; // Cột khóa chính

    @Column(name = "HoTen", nullable = false) // Ánh xạ với cột HoTen trong cơ sở dữ liệu
    private String HoTen;

    @Column(name = "Email", nullable = false, unique = true)  // Ánh xạ với cột Email
    private String email;

    @Column(name = "MatKhau", nullable = false)  // Ánh xạ với cột MatKhau
    private String MatKhau;

    // Enum Role với 2 giá trị ROLE_USER và ROLE_ADMIN
    public enum Role {
        USER,
        ADMIN
    }

    @Enumerated(EnumType.STRING) // Lưu trữ giá trị của Enum dưới dạng chuỗi trong cơ sở dữ liệu
    @Column(name = "Role", nullable = false, columnDefinition = "VARCHAR(20) DEFAULT 'USER'") // Đảm bảo giá trị mặc định là ROLE_USER
    private Role Role;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm") // Ánh xạ với cột createdAt trong database
    @Column(name = "NgayTao", nullable = false)  // Ánh xạ với cột NgayTao trong cơ sở dữ liệu
    private LocalDateTime NgayTao;

    @PrePersist
    protected void onCreate() {
        if (this.Role == null) {
            this.Role = Role.USER; // Đảm bảo nếu không có giá trị nào, mặc định là ROLE_USER
        }
        this.NgayTao = LocalDateTime.now(); // Tự động gán ngày giờ hiện tại
    }

    // Getter và Setter

    public Integer getMaNguoiDung() {
        return maNguoiDung;
    }

    public void setMaNguoiDung(Integer maNguoiDung) {
        maNguoiDung = maNguoiDung;
    }

    public String getHoTen() {
        return HoTen;
    }

    public void setHoTen(String hoTen) {
        HoTen = hoTen;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMatKhau() {
        return MatKhau;
    }

    public void setMatKhau(String matKhau) {
        MatKhau = matKhau;
    }

    public Role getRole() {
        return Role;
    }

    public void setRole(Role role) {
        Role = role;
    }

    public LocalDateTime getNgayTao() {
        return NgayTao;
    }

    public void setNgayTao(LocalDateTime ngayTao) {
        NgayTao = ngayTao;
    }
}
