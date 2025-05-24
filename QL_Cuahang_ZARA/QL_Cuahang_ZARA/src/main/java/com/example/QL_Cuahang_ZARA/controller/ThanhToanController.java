package com.example.QL_Cuahang_ZARA.controller;

import com.example.QL_Cuahang_ZARA.model.ThanhToan;
import com.example.QL_Cuahang_ZARA.service.ThanhToanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/thanh-toan")
public class ThanhToanController {

    @Autowired
    private ThanhToanService thanhToanService;

    @PostMapping
    public ThanhToan themThanhToan(@RequestBody ThanhToan thanhToan) {
        return thanhToanService.themThanhToan(thanhToan);
    }

    @GetMapping
    public List<ThanhToan> layDanhSachThanhToan() {
        return thanhToanService.layDanhSachThanhToan();
    }

    @PutMapping("/{maThanhToan}")
    public ThanhToan capNhatThanhToan(@PathVariable int maThanhToan, @RequestBody ThanhToan thanhToanCapNhat) {
        return thanhToanService.capNhatThanhToan(maThanhToan, thanhToanCapNhat);
    }

    @DeleteMapping("/{maThanhToan}")
    public void xoaThanhToan(@PathVariable int maThanhToan) {
        thanhToanService.xoaThanhToan(maThanhToan);
    }
}
