package com.example.QL_Cuahang_ZARA.service;

import com.example.QL_Cuahang_ZARA.model.ThanhToan;
import com.example.QL_Cuahang_ZARA.repository.ThanhToanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ThanhToanService {

    @Autowired
    private ThanhToanRepository thanhToanRepository;

    public ThanhToan themThanhToan(ThanhToan thanhToan) {
        return thanhToanRepository.save(thanhToan);
    }

    public List<ThanhToan> layDanhSachThanhToan() {
        return thanhToanRepository.findAll();
    }

    public ThanhToan capNhatThanhToan(int maThanhToan, ThanhToan thanhToanCapNhat) {
        ThanhToan thanhToanCu = thanhToanRepository.findById(maThanhToan).orElse(null);
        if (thanhToanCu != null) {
            thanhToanCu.setNgayThanhToan(thanhToanCapNhat.getNgayThanhToan());
            thanhToanCu.setMaQR(thanhToanCapNhat.getMaQR());
            thanhToanCu.setTrangThai(thanhToanCapNhat.getTrangThai());
            return thanhToanRepository.save(thanhToanCu);
        }
        return null;
    }

    public void xoaThanhToan(int maThanhToan) {
        thanhToanRepository.deleteById(maThanhToan);
    }
}
