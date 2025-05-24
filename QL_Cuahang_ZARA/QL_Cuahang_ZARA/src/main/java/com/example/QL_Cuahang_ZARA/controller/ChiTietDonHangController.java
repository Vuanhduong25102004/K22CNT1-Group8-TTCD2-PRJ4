package com.example.QL_Cuahang_ZARA.controller;

import com.example.QL_Cuahang_ZARA.model.ChiTietDonHang;
import com.example.QL_Cuahang_ZARA.service.ChiTietDonHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/chi-tiet-don-hang")
public class ChiTietDonHangController {

    @Autowired
    private ChiTietDonHangService chiTietDonHangService;

    @PostMapping
    public ChiTietDonHang themChiTietDonHang(@RequestBody ChiTietDonHang chiTietDonHang) {
        return chiTietDonHangService.themChiTietDonHang(chiTietDonHang);
    }

    @GetMapping
    public List<ChiTietDonHang> layDanhSachChiTietDonHang() {
        return chiTietDonHangService.layDanhSachChiTietDonHang();
    }

    @PutMapping("/{maChiTiet}")
    public ChiTietDonHang capNhatChiTietDonHang(@PathVariable int maChiTiet, @RequestBody ChiTietDonHang chiTietCapNhat) {
        return chiTietDonHangService.capNhatChiTietDonHang(maChiTiet, chiTietCapNhat);
    }

    @DeleteMapping("/{maChiTiet}")
    public void xoaChiTietDonHang(@PathVariable int maChiTiet) {
        chiTietDonHangService.xoaChiTietDonHang(maChiTiet);
    }
}
