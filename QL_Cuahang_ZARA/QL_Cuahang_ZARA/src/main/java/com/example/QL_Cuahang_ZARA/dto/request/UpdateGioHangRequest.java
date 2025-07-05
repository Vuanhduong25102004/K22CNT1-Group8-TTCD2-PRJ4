package com.example.QL_Cuahang_ZARA.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UpdateGioHangRequest {
    int maNguoiDung;
    int maSanPham;
    int soLuongMoi;
}
