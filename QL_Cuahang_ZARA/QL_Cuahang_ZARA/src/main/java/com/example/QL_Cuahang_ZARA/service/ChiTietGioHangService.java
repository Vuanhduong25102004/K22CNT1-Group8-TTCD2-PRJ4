package com.example.QL_Cuahang_ZARA.service;

import com.example.QL_Cuahang_ZARA.model.ChiTietGioHang;
import com.example.QL_Cuahang_ZARA.repository.ChiTietGioHangRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE , makeFinal = true)
public class ChiTietGioHangService {
    ChiTietGioHangRepository chiTietGioHangRepository;

    public List<ChiTietGioHang> getAllGioHang(){
        return chiTietGioHangRepository.findAll();
    }

    public ChiTietGioHang getGioHangById(Long id){
        return chiTietGioHangRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Giỏ hàng không tồn tại"));
    }

    public ChiTietGioHang updateGioHang(Long id, ChiTietGioHang newChiTiet){
        return chiTietGioHangRepository.findById(id).map(ct -> {
            ct.setGioHang(newChiTiet.getGioHang());
            ct.setSanPham(newChiTiet.getSanPham());
            ct.setSoLuong(newChiTiet.getSoLuong());
            return chiTietGioHangRepository.save(ct);
        }).orElse(null);
    }
    public boolean deleteGioHang(Long id) {
        if (chiTietGioHangRepository.existsById(id)) {
            chiTietGioHangRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
