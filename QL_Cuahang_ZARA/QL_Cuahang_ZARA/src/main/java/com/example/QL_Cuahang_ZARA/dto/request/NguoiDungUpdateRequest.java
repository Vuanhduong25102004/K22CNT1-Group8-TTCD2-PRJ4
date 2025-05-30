package com.example.QL_Cuahang_ZARA.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class NguoiDungUpdateRequest {
    String HoTen;
    String email;
    String MatKhau;
    String Role;
}

