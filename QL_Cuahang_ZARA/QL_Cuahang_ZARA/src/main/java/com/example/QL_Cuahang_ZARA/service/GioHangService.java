package com.example.QL_Cuahang_ZARA.service;

import com.example.QL_Cuahang_ZARA.model.GioHang;
import com.example.QL_Cuahang_ZARA.model.NguoiDung;
import com.example.QL_Cuahang_ZARA.repository.GioHangRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class GioHangService {
    @Autowired
    private GioHangRepository gioHangRepository;

    public GioHang createorgetGioHang(Integer MaNguoiDung){
        GioHang gioHang = gioHangRepository.findByNguoiDung_MaNguoiDung(MaNguoiDung);
        if (gioHang == null){
            gioHang = new GioHang();
            NguoiDung nguoiDung = new NguoiDung();
            nguoiDung.setMaNguoiDung(MaNguoiDung);
            gioHang.setNguoiDung(nguoiDung);

            gioHang.setNgayCapNhat(LocalDateTime.now());
            return gioHangRepository.save(gioHang);
        }
        return gioHang;
    }
}
