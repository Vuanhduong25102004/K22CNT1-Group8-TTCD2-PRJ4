package com.example.QL_Cuahang_ZARA.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class MuaHangCreationRequest {
    Integer MaNguoiDung;
    Integer MaSanPham;
    Integer SoLuong;
}
