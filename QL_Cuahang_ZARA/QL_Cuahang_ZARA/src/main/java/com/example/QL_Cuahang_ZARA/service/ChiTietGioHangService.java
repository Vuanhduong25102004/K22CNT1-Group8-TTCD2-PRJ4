package com.example.QL_Cuahang_ZARA.service;

import com.example.QL_Cuahang_ZARA.dto.request.ThemSanPhamVaoGioHangRequest;
import com.example.QL_Cuahang_ZARA.dto.response.ChiTietGioHangDto;
import com.example.QL_Cuahang_ZARA.model.ChiTietGioHang;
import com.example.QL_Cuahang_ZARA.model.GioHang;
import com.example.QL_Cuahang_ZARA.model.NguoiDung;
import com.example.QL_Cuahang_ZARA.model.SanPham;
import com.example.QL_Cuahang_ZARA.repository.ChiTietGioHangRepository;
import com.example.QL_Cuahang_ZARA.repository.GioHangRepository;
import com.example.QL_Cuahang_ZARA.repository.SanPhamRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE , makeFinal = true)
public class ChiTietGioHangService {
    ChiTietGioHangRepository chiTietGioHangRepository;
    SanPhamRepository sanPhamRepository;
    GioHangRepository gioHangRepository;


    // Trả về danh sách sản phẩm trong giỏ hàng
    public List<ChiTietGioHangDto> getChiTiet(Integer maGioHang) {
        return chiTietGioHangRepository.findByGioHang_MaGioHang(maGioHang)
                .stream()
                .map(this::convertToDto)
                .toList();
    }

    private ChiTietGioHangDto convertToDto(ChiTietGioHang ct) {
        return ChiTietGioHangDto.builder()
                .maChiTietGioHang(ct.getMaChiTietGioHang())
                .maSanPham(ct.getSanPham().getMaSanPham())
                .tenSanPham(ct.getSanPham().getTenSanPham())
                .gia(ct.getSanPham().getGia())
                .soLuong(ct.getSoLuong())
                .hinhAnh(ct.getSanPham().getHinhAnh())
                .build();
    }


    //thêm mới sản phẩm hoặc tăng số lượng nếu đã tồn tại sản phẩm trong giỏ hàng
    public ChiTietGioHang themHoacTangSanPham(Integer maGioHang, Integer maSanPham, Integer soLuongMoi){
        List<ChiTietGioHang> danhSach = chiTietGioHangRepository.findByGioHang_MaGioHang(maGioHang);

        for(ChiTietGioHang ct : danhSach){
            if(ct.getSanPham().getMaSanPham().equals(maSanPham)) {
                ct.setSoLuong(ct.getSoLuong() + soLuongMoi);
                return  chiTietGioHangRepository.save(ct);
            }
        }
        ChiTietGioHang moi = new ChiTietGioHang();

        GioHang gioHang = gioHangRepository.findById(maGioHang)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy giỏ hàng"));

        SanPham sanPham = sanPhamRepository.findById(maSanPham)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm"));

        moi.setGioHang(new GioHang(maGioHang));
        moi.setSanPham(new SanPham(maSanPham));
        moi.setSoLuong(soLuongMoi);
        return chiTietGioHangRepository.save(moi);
    }

    //xóa sản phẩm khỏi giỏ
    public void xoaSanPhamKhoiGio(Integer maChiTiet){
        chiTietGioHangRepository.deleteById(maChiTiet);
    }

    //Cập nhật số lượng sản phẩm trong giỏ
    public ChiTietGioHang capNhatSoLuong(Integer maChiTiet, Integer soLuong){
        ChiTietGioHang ct = chiTietGioHangRepository.findById(maChiTiet).orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm trong giỏ hàng"));
        ct.setSoLuong(soLuong);
        return chiTietGioHangRepository.save(ct);
    }

    public List<ChiTietGioHangDto> themNhieuSanPhamVaoGio(ThemSanPhamVaoGioHangRequest request) {
        GioHang gioHang = gioHangRepository.findByNguoiDung_MaNguoiDung(request.getMaNguoiDung());
        if (gioHang == null) {
            gioHang = new GioHang();
            NguoiDung nguoiDung = new NguoiDung();
            nguoiDung.setMaNguoiDung(request.getMaNguoiDung());
            gioHang.setNguoiDung(nguoiDung);
            gioHang.setNgayCapNhat(java.time.LocalDateTime.now());
            gioHang = gioHangRepository.save(gioHang);
        }

        Integer maGioHangFinal = gioHang.getMaGioHang();

        return request.getDanhSachSanPham().stream()
                .map(sp -> themHoacTangSanPham(maGioHangFinal, sp.getMaSanPham(), sp.getSoLuong()))
                .map(this::convertToDto)
                .toList();
    }
}
