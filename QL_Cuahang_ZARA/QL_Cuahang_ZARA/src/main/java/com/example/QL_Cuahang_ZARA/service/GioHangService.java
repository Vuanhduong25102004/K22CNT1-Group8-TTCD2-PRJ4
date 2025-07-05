package com.example.QL_Cuahang_ZARA.service;

import com.example.QL_Cuahang_ZARA.dto.response.ChiTietGioHangResponse;
import com.example.QL_Cuahang_ZARA.dto.response.GioHangResponse;
import com.example.QL_Cuahang_ZARA.model.ChiTietGioHang;
import com.example.QL_Cuahang_ZARA.model.GioHang;
import com.example.QL_Cuahang_ZARA.model.NguoiDung;
import com.example.QL_Cuahang_ZARA.model.SanPham;
import com.example.QL_Cuahang_ZARA.repository.ChiTietGioHangRepository;
import com.example.QL_Cuahang_ZARA.repository.GioHangRepository;
import com.example.QL_Cuahang_ZARA.repository.NguoiDungRepository;
import com.example.QL_Cuahang_ZARA.repository.SanPhamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class GioHangService {

    @Autowired
    private GioHangRepository gioHangRepository;

    @Autowired
    private NguoiDungRepository nguoiDungRepository;

    @Autowired
    private ChiTietGioHangRepository chiTietGioHangRepository;

    @Autowired
    private SanPhamRepository sanPhamRepository;

    public List<GioHang> getAllGioHang(){
        return gioHangRepository.findAll();
    }
    // Phương thức lấy giỏ hàng của người dùng
    public GioHang getGioHangByUser(int maNguoiDung) {
        // Tìm người dùng từ maNguoiDung
        NguoiDung nguoiDung = nguoiDungRepository.findById(maNguoiDung)
                .orElseThrow(() -> new RuntimeException("Người dùng không tồn tại"));

        // Trả về giỏ hàng của người dùng
        return gioHangRepository.findByNguoiDung(nguoiDung);
    }


    public void addToCart(int maNguoiDung, int maSanPham, int soLuong) {
        // Tìm người dùng từ maNguoiDung
        NguoiDung nguoiDung = nguoiDungRepository.findById(maNguoiDung)
                .orElseThrow(() -> new RuntimeException("Người dùng không tồn tại"));

        // Kiểm tra xem người dùng đã có giỏ hàng chưa
        GioHang gioHang = gioHangRepository.findByNguoiDung_maNguoiDung(maNguoiDung);

        // Nếu không có giỏ hàng, tạo giỏ hàng mới
        if (gioHang == null) {
            gioHang = new GioHang();
            gioHang.setNguoiDung(nguoiDung);
            gioHang.setNgayTao(new Date()); // Đặt thời gian hiện tại
            gioHang.setNgayCapNhat(new Date());
            gioHangRepository.save(gioHang); // Lưu giỏ hàng mới
        }

        // Kiểm tra sản phẩm có tồn tại
        SanPham sanPham = sanPhamRepository.findById(maSanPham).orElseThrow(() -> new RuntimeException("Sản phẩm không tồn tại"));

        // Tìm chi tiết giỏ hàng cho sản phẩm này trong giỏ hàng của người dùng
        Optional<ChiTietGioHang> chiTietGioHangOptional  = chiTietGioHangRepository.findByGioHangAndSanPham(gioHang, sanPham);

        if (chiTietGioHangOptional.isPresent()) {
            // Nếu sản phẩm đã có trong giỏ hàng, lấy ChiTietGioHang từ Optional
            ChiTietGioHang chiTietGioHang = chiTietGioHangOptional.get();
            chiTietGioHang.setSoLuong(chiTietGioHang.getSoLuong() + soLuong);
            chiTietGioHangRepository.save(chiTietGioHang);
        } else {
            // Nếu sản phẩm chưa có trong giỏ hàng, tạo chi tiết giỏ hàng mới
            ChiTietGioHang newChiTietGioHang = new ChiTietGioHang();
            newChiTietGioHang.setGioHang(gioHang);
            newChiTietGioHang.setSanPham(sanPham);
            newChiTietGioHang.setSoLuong(soLuong);

            chiTietGioHangRepository.save(newChiTietGioHang); // Lưu chi tiết giỏ hàng mới
        }
    }
    public GioHangResponse getChiTietGioHangByMaNguoiDung(int maNguoiDung){
        GioHang gioHang = gioHangRepository.findByNguoiDung_maNguoiDung(maNguoiDung);
        if (gioHang == null) {
            throw new RuntimeException("Người dùng chưa có giỏ hàng");
        }

        List<ChiTietGioHang> chiTietList = chiTietGioHangRepository.findByGioHang(gioHang);

        List<ChiTietGioHangResponse> result = new java.util.ArrayList<>();
        BigDecimal tongTien = BigDecimal.ZERO;

        for (ChiTietGioHang ct : chiTietList){
            SanPham sp = ct.getSanPham();
            BigDecimal thanhTien = sp.getGia().multiply(BigDecimal.valueOf(ct.getSoLuong()));
            tongTien = tongTien.add(thanhTien);

            ChiTietGioHangResponse dto = ChiTietGioHangResponse.builder()
                    .maSanPham(sp.getMaSanPham())
                    .tenSanPham(sp.getTenSanPham())
                    .soLuong(ct.getSoLuong())
                    .gia(sp.getGia())
                    .hinhAnh(sp.getHinhAnh())
                    .thanhTien(thanhTien)
                    .build();

            result.add(dto);
        }

        return GioHangResponse.builder()
                .maNguoiDung(maNguoiDung)
                .danhSachSanPham(result)
                .tongTien(tongTien)
                .build();
    }

    public void updateQuantity(int maNguoiDung, int maSanPham, int soLuongMoi) {
        GioHang gioHang = gioHangRepository.findByNguoiDung_maNguoiDung(maNguoiDung);
        SanPham sanPham = sanPhamRepository.findById(maSanPham)
                .orElseThrow(() -> new RuntimeException("Sản phẩm không tồn tại"));
        ChiTietGioHang chiTiet = chiTietGioHangRepository.findByGioHangAndSanPham(gioHang, sanPham)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm trong giỏ hàng"));

        chiTiet.setSoLuong(soLuongMoi);
        chiTietGioHangRepository.save(chiTiet);
    }

}
