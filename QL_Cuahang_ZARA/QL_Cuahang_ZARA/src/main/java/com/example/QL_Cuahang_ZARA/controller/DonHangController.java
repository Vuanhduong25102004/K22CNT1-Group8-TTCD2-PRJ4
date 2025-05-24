package com.example.QL_Cuahang_ZARA.controller;

import com.example.QL_Cuahang_ZARA.model.DonHang;
import com.example.QL_Cuahang_ZARA.service.DonHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/don-hang")
public class DonHangController {

    @Autowired
    private DonHangService donHangService;

    @PostMapping
    public DonHang themDonHang(@RequestBody DonHang donHang) {
        return donHangService.themDonHang(donHang);
    }

    @GetMapping
    public List<DonHang> layDanhSachDonHang() {
        return donHangService.layDanhSachDonHang();
    }

    @PutMapping("/{maDonHang}")
    public DonHang capNhatDonHang(@PathVariable int maDonHang, @RequestBody DonHang donHangCapNhat) {
        return donHangService.capNhatDonHang(maDonHang, donHangCapNhat);
    }

    @DeleteMapping("/{maDonHang}")
    public void xoaDonHang(@PathVariable int maDonHang) {
        donHangService.xoaDonHang(maDonHang);
    }
}
