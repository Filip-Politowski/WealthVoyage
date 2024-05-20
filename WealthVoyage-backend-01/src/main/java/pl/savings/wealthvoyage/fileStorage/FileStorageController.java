package pl.savings.wealthvoyage.fileStorage;

import lombok.RequiredArgsConstructor;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/images")
public class FileStorageController {


    private final FileStorageService fileStorageService;


    @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(@AuthenticationPrincipal UserDetails userDetails,  @RequestParam("file") MultipartFile file) {
        try {
            String filePath = fileStorageService.saveUserImage(userDetails ,file);
            return ResponseEntity.ok("Image uploaded successfully: " + filePath);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error uploading image: " + e.getMessage());
        }
    }

    @GetMapping("/load-image")
    public ResponseEntity<InputStreamResource> getUserImage(@AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails.getUsername();
        return fileStorageService.getUserImage(username);
    }
}
