package com.example.QL_Cuahang_ZARA.controller;

import com.example.QL_Cuahang_ZARA.dto.request.GioHangRequest;
import com.example.QL_Cuahang_ZARA.dto.response.ChiTietGioHangResponse;
import com.example.QL_Cuahang_ZARA.model.GioHang;
import com.example.QL_Cuahang_ZARA.service.GioHangService;
import com.nimbusds.jose.JOSEException;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;

@RestController
@RequestMapping("/giohang")
public class GioHangController {

    @Autowired
    private GioHangService gioHangService;

    @GetMapping("/getallcart")
    public ResponseEntity<List<GioHang>> getAllGioHang(){
        try{
            List<GioHang> gioHang = gioHangService.getAllGioHang();
            return ResponseEntity.ok(gioHang);
        }catch (Exception e) {
            return ResponseEntity.status(500).body(null);  // Trả về lỗi nếu có sự cố
        }
    }
    @GetMapping("/mycart")
    public ResponseEntity<List<ChiTietGioHangResponse>> getChiTietGioHang(@RequestHeader("Authorization") String token) {
        try {
            int maNguoiDung = getMaNguoiDungFromToken(token);

            List<ChiTietGioHangResponse> response = gioHangService.getChiTietGioHangByMaNguoiDung(maNguoiDung);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }

    @PostMapping("/add")
    public ResponseEntity<String> addToCart(@RequestBody GioHangRequest request) {
        try {
            gioHangService.addToCart(request.getMaNguoiDung(), request.getMaSanPham(), request.getSoLuong());
            return ResponseEntity.ok("Sản phẩm đã được thêm vào giỏ hàng");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    private int getMaNguoiDungFromToken(String token) {
        try {
            if (token == null || !token.startsWith("Bearer ")) {
                throw new RuntimeException("Invalid Authorization token format");
            }

            // Loại bỏ "Bearer " khỏi token
            token = token.substring(7);

            // Giải mã token JWT
            SignedJWT signedJWT = SignedJWT.parse(token);

            // Lấy claims từ token
            JWTClaimsSet claimsSet = signedJWT.getJWTClaimsSet();

            // In ra toàn bộ claims để kiểm tra payload
            System.out.println("Token Claims: " + claimsSet.getClaims());

            // Lấy maNguoiDung từ claims (payload)
            Object maNguoiDungObject = claimsSet.getClaim("maNguoiDung");

            // Kiểm tra kiểu dữ liệu của maNguoiDung và ép kiểu phù hợp
            if (maNguoiDungObject instanceof Integer) {
                return (Integer) maNguoiDungObject;
            } else if (maNguoiDungObject instanceof Long) {
                return ((Long) maNguoiDungObject).intValue(); // Chuyển Long thành int
            } else if (maNguoiDungObject instanceof String) {
                try {
                    return Integer.parseInt((String) maNguoiDungObject); // Nếu là String, ép kiểu về Integer
                } catch (NumberFormatException e) {
                    throw new RuntimeException("maNguoiDung is not a valid number");
                }
            } else {
                throw new RuntimeException("maNguoiDung is not of type Integer, Long, or String");
            }
        } catch (ParseException e) {
            throw new RuntimeException("Error while parsing JWT", e);
        } catch (Exception e) {
            // Catch all other exceptions
            e.printStackTrace();  // In thêm lỗi để debug
            throw new RuntimeException("Error while processing JWT", e);
        }
    }

}