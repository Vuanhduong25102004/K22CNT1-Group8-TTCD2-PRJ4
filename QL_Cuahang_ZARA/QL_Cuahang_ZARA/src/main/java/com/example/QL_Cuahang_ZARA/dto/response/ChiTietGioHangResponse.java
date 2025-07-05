package com.example.QL_Cuahang_ZARA.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ChiTietGioHangResponse {
    Integer maSanPham;
    String tenSanPham;
    Integer soLuong;
    BigDecimal gia;
    String hinhAnh;
    BigDecimal thanhTien;
}

