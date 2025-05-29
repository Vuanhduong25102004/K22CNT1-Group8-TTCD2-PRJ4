package com.example.QL_Cuahang_ZARA.controller;

import com.example.QL_Cuahang_ZARA.model.SanPham;
import com.example.QL_Cuahang_ZARA.service.SanPhamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
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
    public SanPham createSanPham(
            @RequestPart("sanPham") SanPham sanPham,
            @RequestPart("image") MultipartFile image) throws IOException {
        String fileName = sanPhamService.saveImage(image);
        sanPham.setHinhAnh(fileName);
        return sanPhamService.createSanPham(sanPham);
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
    public SanPham updateSanPham(
            @PathVariable Integer id,
            @RequestPart("sanPham") SanPham sanPham,
            @RequestPart(value = "image", required = false) MultipartFile image) throws IOException {
        if (image != null && !image.isEmpty()) {
            String fileName = sanPhamService.saveImage(image);
            sanPham.setHinhAnh(fileName);
        }
        return sanPhamService.updateSanPham(id, sanPham);
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
