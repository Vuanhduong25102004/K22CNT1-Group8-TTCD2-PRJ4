package com.example.QL_Cuahang_ZARA.dto.request;

import lombok.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ThemSanPhamVaoGioHangRequest {
    private Integer maNguoiDung;
    private List<SanPhamTrongGio> danhSachSanPham;
}

