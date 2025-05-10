package com.example.QL_Cuahang_ZARA.controller;

import com.example.QL_Cuahang_ZARA.dto.request.NguoiDungCreationRequest;
import com.example.QL_Cuahang_ZARA.dto.request.NguoiDungUpdateRequest;
import com.example.QL_Cuahang_ZARA.model.NguoiDung;
import com.example.QL_Cuahang_ZARA.service.NguoiDungService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/users")
public class NguoiDungController {
    @Autowired
    private NguoiDungService nguoiDungService;

    @PostMapping
    NguoiDung createNguoiDung(@RequestBody NguoiDungCreationRequest request){
        try {
            return nguoiDungService.createNguoiDung(request);
        } catch (RuntimeException e) {
            // Trả về lỗi nếu email đã tồn tại
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @GetMapping
    public List<NguoiDung> getNguoiDung() {
        return nguoiDungService.getNguoiDung();
    }

    @GetMapping("/{MaNguoiDung}")
    NguoiDung getNguoiDung(@PathVariable("MaNguoiDung") Long MaNguoiDung){
        return nguoiDungService.getNguoiDung(MaNguoiDung);
    }

    @PutMapping("/{MaNguoiDung}")
    NguoiDung updateNguoiDung(@PathVariable Long MaNguoiDung, @RequestBody NguoiDungUpdateRequest request){
        try {
            return nguoiDungService.updateNguoiDung(MaNguoiDung, request);
        } catch (RuntimeException e) {
            // Trả về lỗi nếu email đã tồn tại
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @DeleteMapping("/{MaNguoiDung}")
    String deleteNguoiDung(@PathVariable Long MaNguoiDung){
        nguoiDungService.deleteNguoiDung(MaNguoiDung);
        return "Người dùng đã bị xóa";
    }
}
