package com.example.QL_Cuahang_ZARA.dto.response;

import lombok.*;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChiTietGioHangDto {
    private Long maChiTietGioHang;
    private Integer maSanPham;
    private String tenSanPham;
    private BigDecimal gia;
    private Integer soLuong;
    private String hinhAnh;
}