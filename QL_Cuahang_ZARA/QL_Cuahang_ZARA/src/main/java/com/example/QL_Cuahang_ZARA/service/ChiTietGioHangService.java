package com.example.QL_Cuahang_ZARA.service;

import com.example.QL_Cuahang_ZARA.model.ChiTietGioHang;
import com.example.QL_Cuahang_ZARA.model.GioHang;
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
    public List<ChiTietGioHang> getChiTiet(Integer maGioHang){
        return chiTietGioHangRepository.findByGioHang_MaGioHang(maGioHang);
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
}
