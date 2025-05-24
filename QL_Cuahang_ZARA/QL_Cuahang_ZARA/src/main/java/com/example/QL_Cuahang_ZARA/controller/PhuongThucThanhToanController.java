package com.example.QL_Cuahang_ZARA.controller;

import com.example.QL_Cuahang_ZARA.model.PhuongThucThanhToan;
import com.example.QL_Cuahang_ZARA.service.PhuongThucThanhToanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/phuong-thuc-thanh-toan")
public class PhuongThucThanhToanController {

    @Autowired
    private PhuongThucThanhToanService phuongThucThanhToanService;

    @PostMapping
    public PhuongThucThanhToan themPhuongThucThanhToan(@RequestBody PhuongThucThanhToan phuongThucThanhToan) {
        return phuongThucThanhToanService.themPhuongThucThanhToan(phuongThucThanhToan);
    }

    @GetMapping
    public List<PhuongThucThanhToan> layDanhSachPhuongThucThanhToan() {
        return phuongThucThanhToanService.layDanhSachPhuongThucThanhToan();
    }

    @PutMapping("/{maPhuongThuc}")
    public PhuongThucThanhToan capNhatPhuongThucThanhToan(@PathVariable int maPhuongThuc, @RequestBody PhuongThucThanhToan phuongThucCapNhat) {
        return phuongThucThanhToanService.capNhatPhuongThucThanhToan(maPhuongThuc, phuongThucCapNhat);
    }

    @DeleteMapping("/{maPhuongThuc}")
    public void xoaPhuongThucThanhToan(@PathVariable int maPhuongThuc) {
        phuongThucThanhToanService.xoaPhuongThucThanhToan(maPhuongThuc);
    }
}
