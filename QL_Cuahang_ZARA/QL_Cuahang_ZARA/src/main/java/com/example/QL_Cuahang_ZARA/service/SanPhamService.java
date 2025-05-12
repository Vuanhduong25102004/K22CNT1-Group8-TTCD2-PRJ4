package com.example.QL_Cuahang_ZARA.service;

import com.example.QL_Cuahang_ZARA.model.SanPham;
import com.example.QL_Cuahang_ZARA.repository.SanPhamRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE , makeFinal = true)
public class SanPhamService {
    SanPhamRepository sanPhamRepository;

    // Lấy tất cả sản phẩm
    public List<SanPham> getAllSanPham() {
        return sanPhamRepository.findAll();
    }

    // Lấy sản phẩm theo ID
    public SanPham getSanPhamById(Integer id) {
        return sanPhamRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sản phẩm không tồn tại"));
    }

    // Tạo sản phẩm mới
    public SanPham createSanPham(SanPham sanPham) {
        return sanPhamRepository.save(sanPham);
    }

    // Cập nhật sản phẩm
    public SanPham updateSanPham(Integer id, SanPham sanPham) {
        SanPham existingSanPham = sanPhamRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sản phẩm không tồn tại"));
        existingSanPham.setTenSanPham(sanPham.getTenSanPham());
        existingSanPham.setMoTa(sanPham.getMoTa());
        existingSanPham.setGia(sanPham.getGia());
        existingSanPham.setSoLuongTon(sanPham.getSoLuongTon());
        existingSanPham.setHinhAnh(sanPham.getHinhAnh());
        return sanPhamRepository.save(existingSanPham);
    }

    // Xóa sản phẩm
    public void deleteSanPham(Integer id) {
        if (!sanPhamRepository.existsById(id)) {
            throw new RuntimeException("Sản phẩm không tồn tại");
        }
        sanPhamRepository.deleteById(id);
    }
}