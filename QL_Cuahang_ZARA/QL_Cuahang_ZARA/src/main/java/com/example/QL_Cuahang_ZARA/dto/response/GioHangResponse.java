package com.example.QL_Cuahang_ZARA.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class GioHangResponse {
    int maNguoiDung;
    List<ChiTietGioHangResponse> danhSachSanPham;
    BigDecimal tongTien;
}
