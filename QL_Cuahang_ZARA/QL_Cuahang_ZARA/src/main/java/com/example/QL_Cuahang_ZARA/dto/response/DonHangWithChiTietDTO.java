package com.example.QL_Cuahang_ZARA.dto.response;

import lombok.*;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class DonHangWithChiTietDTO {
    private int maDonHang;
    private BigDecimal tongTien;
    private String trangThaiThanhToan;
    private Date ngayDat;
    private List<ChiTietDonHangDTO> chiTietDonHang;
}