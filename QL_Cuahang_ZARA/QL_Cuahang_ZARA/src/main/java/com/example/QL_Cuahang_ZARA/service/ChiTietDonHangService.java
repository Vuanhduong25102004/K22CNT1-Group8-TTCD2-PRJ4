package com.example.QL_Cuahang_ZARA.service;

import org.springframework.stereotype.Service;
import com.example.QL_Cuahang_ZARA.model.ChiTietDonHang;
import com.example.QL_Cuahang_ZARA.repository.ChiTietDonHangRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ChiTietDonHangService {
    @Autowired
    private ChiTietDonHangRepository chiTietDonHangRepository;

    public ChiTietDonHang themChiTietDonHang(ChiTietDonHang chiTietDonHang) {
        return chiTietDonHangRepository.save(chiTietDonHang);
    }

    public List<ChiTietDonHang> layDanhSachChiTietDonHang() {
        return chiTietDonHangRepository.findAll();
    }

    public ChiTietDonHang capNhatChiTietDonHang(int maChiTiet, ChiTietDonHang chiTietCapNhat) {
        ChiTietDonHang chiTietCu = chiTietDonHangRepository.findById(maChiTiet).orElse(null);
        if (chiTietCu != null) {
            chiTietCu.setSoLuong(chiTietCapNhat.getSoLuong());
            chiTietCu.setDonGia(chiTietCapNhat.getDonGia());
            return chiTietDonHangRepository.save(chiTietCu);
        }
        return null;
    }

    public void xoaChiTietDonHang(int maChiTiet) {
        chiTietDonHangRepository.deleteById(maChiTiet);
    }
}
