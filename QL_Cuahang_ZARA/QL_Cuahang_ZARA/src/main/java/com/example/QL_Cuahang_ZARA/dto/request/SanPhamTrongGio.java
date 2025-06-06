package com.example.QL_Cuahang_ZARA.dto.request;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Builder;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SanPhamTrongGio {
    private Integer maSanPham;
    private Integer soLuong;
}