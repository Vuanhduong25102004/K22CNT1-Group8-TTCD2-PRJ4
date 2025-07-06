package com.example.QL_Cuahang_ZARA.controller;

import com.example.QL_Cuahang_ZARA.model.ChiTietGioHang;
import com.example.QL_Cuahang_ZARA.service.ChiTietGioHangService;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/chitietgiohang")
@CrossOrigin(origins = "*")
public class ChiTietGioHangController {

    @Autowired
    private ChiTietGioHangService chiTietGioHangService;

    @GetMapping
    public List<ChiTietGioHang> getAll() {
        return chiTietGioHangService.getAllGioHang();
    }

    @GetMapping("/{id}")
    public ChiTietGioHang getById(@PathVariable Long id) {
        return chiTietGioHangService.getGioHangById(id);
    }

    @PutMapping("/{id}")
    public ChiTietGioHang update(@PathVariable Long id, @RequestBody ChiTietGioHang chiTiet) {
        return chiTietGioHangService.updateGioHang(id, chiTiet);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        return chiTietGioHangService.deleteGioHang(id) ? "Xóa thành công" : "Không tìm thấy giỏ hàng";
    }
}
