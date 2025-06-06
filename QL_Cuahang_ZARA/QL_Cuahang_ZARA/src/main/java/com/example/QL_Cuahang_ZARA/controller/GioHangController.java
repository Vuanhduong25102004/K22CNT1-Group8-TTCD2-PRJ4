package com.example.QL_Cuahang_ZARA.controller;

import com.example.QL_Cuahang_ZARA.dto.request.MuaHangCreationRequest;
import com.example.QL_Cuahang_ZARA.dto.request.ThemSanPhamVaoGioHangRequest;
import com.example.QL_Cuahang_ZARA.dto.response.ChiTietGioHangDto;
import com.example.QL_Cuahang_ZARA.model.ChiTietGioHang;
import com.example.QL_Cuahang_ZARA.model.GioHang;
import com.example.QL_Cuahang_ZARA.service.ChiTietGioHangService;
import com.example.QL_Cuahang_ZARA.service.GioHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/giohang")
@CrossOrigin("*")

public class GioHangController {
    @Autowired
    private GioHangService gioHangService;

    @Autowired
    private ChiTietGioHangService chiTietGioHangService;

    @GetMapping("/{maNguoiDung}")
    public GioHang taoHoacLayGioHang(@PathVariable Integer maNguoiDung){
        return gioHangService.createorgetGioHang(maNguoiDung);
    }

    @GetMapping("/{maNguoiDung}/chitiet")
    public List<ChiTietGioHangDto> layChiTietGioHang(@PathVariable Integer maNguoiDung) {
        GioHang gioHang = gioHangService.createorgetGioHang(maNguoiDung);
        return chiTietGioHangService.getChiTiet(gioHang.getMaGioHang());
    }


    @PostMapping("/mua-ngay")
    public ChiTietGioHang muaNgay(@RequestBody MuaHangCreationRequest request) {
        GioHang gioHang = gioHangService.createorgetGioHang(request.getMaNguoiDung());
        return chiTietGioHangService.themHoacTangSanPham(
                gioHang.getMaGioHang(),
                request.getMaSanPham(),
                request.getSoLuong()
        );
    }

    @PostMapping("/them-nhieu")
    public List<ChiTietGioHangDto> themNhieuSanPham(
            @RequestBody ThemSanPhamVaoGioHangRequest request) {
        return chiTietGioHangService.themNhieuSanPhamVaoGio(request);
    }

}
