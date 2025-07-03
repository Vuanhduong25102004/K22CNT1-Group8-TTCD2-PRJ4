package com.example.QL_Cuahang_ZARA.service;

import com.example.QL_Cuahang_ZARA.model.DonHang;
import com.example.QL_Cuahang_ZARA.repository.DonHangRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DonHangService {

    @Autowired
    private DonHangRepository donHangRepository;

    public DonHang themDonHang(DonHang donHang) {
        if (donHang.getTrangThaiThanhToan() == null) {
            donHang.setTrangThaiThanhToan("Chờ thanh toán");
        }
        if (donHang.getTrangThaiDonHang() == null) {
            donHang.setTrangThaiDonHang("Chờ xác nhận");
        }

        return donHangRepository.save(donHang);
    }

    public List<DonHang> layDanhSachDonHang() {
        return donHangRepository.findAll();
    }

    public DonHang capNhatDonHang(int maDonHang, DonHang donHangCapNhat) {
        DonHang donHangCu = donHangRepository.findById(maDonHang).orElse(null);
        if (donHangCu != null) {
            donHangCu.setTongTien(donHangCapNhat.getTongTien());
            donHangCu.setTrangThaiThanhToan(donHangCapNhat.getTrangThaiThanhToan());
            donHangCu.setTrangThaiDonHang(donHangCapNhat.getTrangThaiDonHang());
            donHangCu.setNgayDat(donHangCapNhat.getNgayDat());
            return donHangRepository.save(donHangCu);
        }
        return null;
    }

    public void xoaDonHang(int maDonHang) {
        donHangRepository.deleteById(maDonHang);
    }
}
