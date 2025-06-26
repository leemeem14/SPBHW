package com.example.spbhw.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class WebController {

    @GetMapping
    public String index(Model model) {
        model.addAttribute("title", "메인 페이지");
        model.addAttribute("description", "즐겨찾기 링크와 네비게이션");
        return "index";
    }

    @GetMapping("/animation")
    public String animation(Model model) {
        model.addAttribute("title", "문자 슬라이드");
        model.addAttribute("animationText", "Just a sample text");
        return "animation";
    }
    @GetMapping("/gallery")
    public String gallery(Model model) {
        model.addAttribute("title", "취미 갤러리");
        model.addAttribute("description", "핸드폰에서 가져온 제 취미와 관련된 사진들입니다.");

        // ⭐ 핵심 수정: 파일명 앞에 /images/ 경로 추가
        String[] images = {
                "/images/KakaoTalk_20240611_132807030_01.jpg",
                "/images/KakaoTalk_20240611_132807030_02.jpg",
                "/images/KakaoTalk_20240611_132807030_03.jpg",
                "/images/KakaoTalk_20240611_132807030_04.jpg",
                "/images/KakaoTalk_20240611_132807030_05.jpg",
                "/images/KakaoTalk_20240611_132807030_06.jpg",
                "/images/KakaoTalk_20240611_132807030_07.jpg",
                "/images/KakaoTalk_20240611_132807030_08.jpg",
                "/images/KakaoTalk_20240611_132807030_09.jpg",
                "/images/KakaoTalk_20240611_132807030_10.jpg",
                "/images/KakaoTalk_20240611_132807030_11.jpg",
                "/images/dDdliS9lDLHUEunjEdVY1ZWoS1sfi2F3b0uaxReoaC5FrddP3O8GFGUe8vkleQEjBDP4vtA_vDbs0Sxt8z8XbQ.jpg"
        };
        model.addAttribute("images", images);
        return "gallery";
    }
}
