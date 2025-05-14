package com.example.QL_Cuahang_ZARA.dto.response;

import com.example.QL_Cuahang_ZARA.model.NguoiDung;
import jakarta.persistence.Column;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class NguoiDungResponse {
    Integer maNguoiDung;
    String HoTen;
    String email;
    String MatKhau;
    NguoiDung.Role Role;
}
