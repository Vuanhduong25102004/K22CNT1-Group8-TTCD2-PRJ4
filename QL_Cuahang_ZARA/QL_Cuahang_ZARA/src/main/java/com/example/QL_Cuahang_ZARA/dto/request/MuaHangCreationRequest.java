package com.example.QL_Cuahang_ZARA.dto.request;

public class MuaHangCreationRequest {
    private Integer MaNguoiDung;
    private Integer MaSanPham;
    private Integer SoLuong;

    public Integer getMaNguoiDung() {
        return MaNguoiDung;
    }

    public void setMaNguoiDung(Integer maNguoiDung) {
        MaNguoiDung = maNguoiDung;
    }

    public Integer getMaSanPham() {
        return MaSanPham;
    }

    public void setMaSanPham(Integer maSanPham) {
        MaSanPham = maSanPham;
    }

    public Integer getSoLuong() {
        return SoLuong;
    }

    public void setSoLuong(Integer soLuong) {
        SoLuong = soLuong;
    }
}
