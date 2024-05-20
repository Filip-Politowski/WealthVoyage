package pl.savings.wealthvoyage.fileStorage;

import lombok.RequiredArgsConstructor;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import pl.savings.wealthvoyage.user.User;
import pl.savings.wealthvoyage.user.UserRepository;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FileStorageService {

    private static final String IMAGE_DIR = "uploads/";
    private final UserRepository userRepository;


    public String saveUserImage(UserDetails userDetails, MultipartFile file) throws IOException {
        Optional<User> optionalUser = userRepository.findByUsername(userDetails.getUsername());
        if (optionalUser.isPresent()) {

            File dir = new File(IMAGE_DIR);
            if (!dir.exists()) {
                dir.mkdirs();
            }
            String fileName = file.getOriginalFilename();
            String filePath = IMAGE_DIR + fileName;
            BufferedImage image = ImageIO.read(file.getInputStream());
            File outputFile = new File(filePath);
            ImageIO.write(image, "png", outputFile);
            optionalUser.get().setProfilePicturePath(fileName);
            userRepository.save(optionalUser.get());
            return filePath;
        } else {
            throw new NoSuchElementException("User is not present");
        }
    }


    public ResponseEntity<InputStreamResource> getUserImage(String username) {
        Optional<User> optionalUser = userRepository.findByUsername(username);
        if (optionalUser.isPresent()) {
            String fileName = optionalUser.get().getProfilePicturePath();
            try {
                BufferedImage image = loadImage(fileName);
                ByteArrayOutputStream os = new ByteArrayOutputStream();
                ImageIO.write(image, "png", os);
                InputStreamResource resource = new InputStreamResource(new ByteArrayInputStream(os.toByteArray()));

                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"")
                        .contentType(MediaType.IMAGE_PNG)
                        .contentLength(os.size())
                        .body(resource);
            } catch (IOException e) {
                return ResponseEntity.status(404).body(null);
            }
        } else {
            throw new NoSuchElementException("User is not present");
        }
    }

    public BufferedImage loadImage(String filename) throws IOException {
        File file = new File(IMAGE_DIR + filename);
        return ImageIO.read(file);
    }
}
