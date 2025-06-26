package com.example.spbhw.service;

import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class GalleryService {

    public List<String> getGalleryImages() {
        return Arrays.asList(
                "/images/1.jpg",
                "/images/2.jpg",
                "/images/3.jpg"
        );
    }

    public String getImageDescription(String imageName) {
        return switch (imageName) {
            case "1.jpg" -> "취미 활동 1";
            case "2.jpg" -> "취미 활동 2";
            case "3.jpg" -> "취미 활동 3";
            default -> "이미지";
        };
    }
}

