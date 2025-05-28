package com.example.QL_Cuahang_ZARA.controller;

import com.example.QL_Cuahang_ZARA.model.DanhMuc;
import com.example.QL_Cuahang_ZARA.service.DanhMucService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/danh-muc") // Định nghĩa đường dẫn API cho danh mục
@CrossOrigin("*")
public class DanhMucController {

    @Autowired
    private DanhMucService danhMucService;

    // Tạo danh mục mới
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)  // Trả về mã trạng thái 201 khi tạo thành công
    public DanhMuc createDanhMuc(@RequestBody DanhMuc danhMuc) {
        try {
            return danhMucService.createDanhMuc(danhMuc);  // Tạo danh mục mới
        } catch (RuntimeException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    // Lấy danh sách tất cả danh mục
    @GetMapping
    public List<DanhMuc> getAllDanhMuc() {
        return danhMucService.getAllDanhMuc();  // Lấy tất cả danh mục
    }

    // Lấy thông tin danh mục theo ID (String)
    @GetMapping("/{maDanhMuc}")
    public DanhMuc getDanhMucById(@PathVariable("maDanhMuc") String id) {
        try {
            return danhMucService.getDanhMucById(id);  // Lấy danh mục theo ID
        } catch (RuntimeException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    // Cập nhật danh mục
    @PutMapping("/{maDanhMuc}")
    public DanhMuc updateDanhMuc(@PathVariable("maDanhMuc") String id, @RequestBody DanhMuc danhMuc) {
        try {
            return danhMucService.updateDanhMuc(id, danhMuc);  // Cập nhật danh mục theo ID
        } catch (RuntimeException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    // Xóa danh mục
    @DeleteMapping("/{maDanhMuc}")
    public ResponseEntity<String> deleteDanhMuc(@PathVariable("maDanhMuc") String id) {
        try {
            danhMucService.deleteDanhMuc(id);  // Xóa danh mục theo ID
            return ResponseEntity.status(HttpStatus.OK).body("Xóa danh mục thành công");
        } catch (RuntimeException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }
}