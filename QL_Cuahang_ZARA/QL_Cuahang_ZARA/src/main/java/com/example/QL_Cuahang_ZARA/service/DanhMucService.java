package com.example.QL_Cuahang_ZARA.service;

import com.example.QL_Cuahang_ZARA.model.DanhMuc;
import com.example.QL_Cuahang_ZARA.repository.DanhMucRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE , makeFinal = true)
public class DanhMucService {
    DanhMucRepository danhMucRepository;

    // Lấy tất cả danh mục
    public List<DanhMuc> getAllDanhMuc() {
        return danhMucRepository.findAll();
    }

    // Lấy danh mục theo ID (String)
    public DanhMuc getDanhMucById(String id) {
        return danhMucRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Danh mục không tồn tại"));
    }

    // Tạo danh mục mới
    public DanhMuc createDanhMuc(DanhMuc danhMuc) {
        return danhMucRepository.save(danhMuc);
    }

    // Cập nhật danh mục
    public DanhMuc updateDanhMuc(String id, DanhMuc danhMuc) {
        DanhMuc existingDanhMuc = danhMucRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Danh mục không tồn tại"));
        existingDanhMuc.setTenDanhMuc(danhMuc.getTenDanhMuc());
        return danhMucRepository.save(existingDanhMuc);
    }

    // Xóa danh mục
    public void deleteDanhMuc(String id) {
        if (!danhMucRepository.existsById(id)) {
            throw new RuntimeException("Danh mục không tồn tại");
        }
        danhMucRepository.deleteById(id);
    }
}
