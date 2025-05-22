package com.example.QL_Cuahang_ZARA.controller;

import com.example.QL_Cuahang_ZARA.config.SecurityConfig;
import com.example.QL_Cuahang_ZARA.dto.request.NguoiDungCreationRequest;
import com.example.QL_Cuahang_ZARA.dto.request.NguoiDungUpdateRequest;
import com.example.QL_Cuahang_ZARA.model.NguoiDung;
import com.example.QL_Cuahang_ZARA.service.NguoiDungService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/users")
@CrossOrigin("*")

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
        var authentication = SecurityContextHolder.getContext().getAuthentication();

        log.info("Email: {}", authentication.getName());
        authentication.getAuthorities().forEach(grantedAuthority -> log.info(grantedAuthority.getAuthority()));

        return nguoiDungService.getNguoiDung();
    }

    @GetMapping("/{MaNguoiDung}")
    NguoiDung getNguoiDung(@PathVariable("MaNguoiDung") Integer MaNguoiDung){
        return nguoiDungService.getNguoiDung(MaNguoiDung);
    }

    @GetMapping("/myinfo")
    public NguoiDung getMyInfo() {
        return nguoiDungService.getMyInfo();
    }

    @PutMapping("/{MaNguoiDung}")
    NguoiDung updateNguoiDung(@PathVariable Integer MaNguoiDung, @RequestBody NguoiDungUpdateRequest request){
        try {
            return nguoiDungService.updateNguoiDung(MaNguoiDung, request);
        } catch (RuntimeException e) {
            // Trả về lỗi nếu email đã tồn tại
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @DeleteMapping("/{MaNguoiDung}")
    String deleteNguoiDung(@PathVariable Integer MaNguoiDung){
        nguoiDungService.deleteNguoiDung(MaNguoiDung);
        return "Người dùng đã bị xóa";
    }
}
