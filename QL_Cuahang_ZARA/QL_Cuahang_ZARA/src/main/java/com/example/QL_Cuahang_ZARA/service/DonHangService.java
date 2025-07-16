package com.example.QL_Cuahang_ZARA.service;

import com.example.QL_Cuahang_ZARA.dto.response.ChiTietDonHangDTO;
import com.example.QL_Cuahang_ZARA.dto.response.DonHangWithChiTietDTO;
import com.example.QL_Cuahang_ZARA.model.ChiTietDonHang;
import com.example.QL_Cuahang_ZARA.model.DonHang;
import com.example.QL_Cuahang_ZARA.repository.ChiTietDonHangRepository;
import com.example.QL_Cuahang_ZARA.repository.DonHangRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class DonHangService {

    @Autowired
    private DonHangRepository donHangRepository;

    @Autowired
    private ChiTietDonHangRepository chiTietDonHangRepository;

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

    public List<DonHang> layDonHangTheoNguoiDung(int maNguoiDung) {
        return donHangRepository.findByNguoiDung_MaNguoiDung(maNguoiDung);
    }

    @Transactional
    public void xacNhanThanhToan(int maDonHang) {
        DonHang donHang = donHangRepository.findById(maDonHang)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn hàng"));

        donHang.setTrangThaiThanhToan("Đã thanh toán");
        donHang.setTrangThaiDonHang("Đang xử lý");

        donHangRepository.save(donHang);

    }

    public List<DonHangWithChiTietDTO> layDonHangVaSanPhamTheoNguoiDung(int maNguoiDung) {
        List<DonHang> danhSach = donHangRepository.findByNguoiDung_MaNguoiDung(maNguoiDung);
        return danhSach.stream().map(donHang -> {
            DonHangWithChiTietDTO dto = new DonHangWithChiTietDTO();
            dto.setMaDonHang(donHang.getMaDonHang());
            dto.setTongTien(donHang.getTongTien());
            dto.setTrangThaiThanhToan(donHang.getTrangThaiThanhToan());
            dto.setNgayDat(donHang.getNgayDat());

            List<ChiTietDonHangDTO> chiTietList = chiTietDonHangRepository.findByDonHang(donHang)
                    .stream()
                    .map(ct -> {
                        ChiTietDonHangDTO ctDTO = new ChiTietDonHangDTO();
                        ctDTO.setMaSanPham(ct.getSanPham().getMaSanPham());
                        ctDTO.setTenSanPham(ct.getSanPham().getTenSanPham());
                        ctDTO.setSoLuong(ct.getSoLuong());
                        ctDTO.setDonGia(ct.getDonGia());
                        return ctDTO;
                    }).toList();

            dto.setChiTietDonHang(chiTietList);
            return dto;
        }).toList();
    }
}
