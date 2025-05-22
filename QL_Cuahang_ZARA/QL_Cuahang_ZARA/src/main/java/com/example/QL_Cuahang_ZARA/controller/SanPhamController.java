package com.example.QL_Cuahang_ZARA.controller;

import com.example.QL_Cuahang_ZARA.model.SanPham;
import com.example.QL_Cuahang_ZARA.service.SanPhamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/products")// Định nghĩa đường dẫn API cho sản phẩm
@CrossOrigin("*")
public class SanPhamController {

    @Autowired
    private SanPhamService sanPhamService;

    // Tạo sản phẩm mới
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)  // Trả về mã trạng thái 201 khi tạo thành công
    public SanPham createSanPham(@RequestBody SanPham sanPham) {
        try {
            return sanPhamService.createSanPham(sanPham);  // Tạo sản phẩm mới
        } catch (RuntimeException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    // Lấy danh sách tất cả sản phẩm
    @GetMapping
    public List<SanPham> getAllSanPham() {
        return sanPhamService.getAllSanPham();  // Lấy tất cả sản phẩm
    }

    // Lấy thông tin sản phẩm theo ID
    @GetMapping("/{id}")
    public SanPham getSanPhamById(@PathVariable("id") Integer id) {
        try {
            return sanPhamService.getSanPhamById(id);  // Lấy sản phẩm theo ID
        } catch (RuntimeException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    // Cập nhật sản phẩm
    @PutMapping("/{id}")
    public SanPham updateSanPham(@PathVariable("id") Integer id, @RequestBody SanPham sanPham) {
        try {
            return sanPhamService.updateSanPham(id, sanPham);  // Cập nhật sản phẩm theo ID
        } catch (RuntimeException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    // Xóa sản phẩm
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteSanPham(@PathVariable("id") Integer id) {
        try {
            sanPhamService.deleteSanPham(id);  // Xóa sản phẩm theo ID
            return ResponseEntity.status(HttpStatus.OK).body("Xóa sản phẩm thành công");
        } catch (RuntimeException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }
}
