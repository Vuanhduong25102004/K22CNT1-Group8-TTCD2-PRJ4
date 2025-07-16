package com.example.QL_Cuahang_ZARA.dto.response;

import lombok.*;

import java.math.BigDecimal;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ChiTietDonHangDTO {
    private int maSanPham;
    private String tenSanPham;
    private int soLuong;
    private BigDecimal donGia;
}