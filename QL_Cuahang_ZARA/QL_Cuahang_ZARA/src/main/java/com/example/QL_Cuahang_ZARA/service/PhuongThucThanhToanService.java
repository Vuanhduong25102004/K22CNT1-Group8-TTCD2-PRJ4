package com.example.QL_Cuahang_ZARA.service;

import com.example.QL_Cuahang_ZARA.model.PhuongThucThanhToan;
import com.example.QL_Cuahang_ZARA.repository.PhuongThucThanhToanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PhuongThucThanhToanService {

    @Autowired
    private PhuongThucThanhToanRepository phuongThucThanhToanRepository;

    public PhuongThucThanhToan themPhuongThucThanhToan(PhuongThucThanhToan phuongThucThanhToan) {
        return phuongThucThanhToanRepository.save(phuongThucThanhToan);
    }

    public List<PhuongThucThanhToan> layDanhSachPhuongThucThanhToan() {
        return phuongThucThanhToanRepository.findAll();
    }

    public PhuongThucThanhToan capNhatPhuongThucThanhToan(int maPhuongThuc, PhuongThucThanhToan phuongThucCapNhat) {
        PhuongThucThanhToan phuongThucCu = phuongThucThanhToanRepository.findById(maPhuongThuc).orElse(null);
        if (phuongThucCu != null) {
            phuongThucCu.setTenPhuongThuc(phuongThucCapNhat.getTenPhuongThuc());
            return phuongThucThanhToanRepository.save(phuongThucCu);
        }
        return null;
    }

    public void xoaPhuongThucThanhToan(int maPhuongThuc) {
        phuongThucThanhToanRepository.deleteById(maPhuongThuc);
    }
}
