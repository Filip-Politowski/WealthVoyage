package pl.savings.wealthvoyage.controller;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.savings.wealthvoyage.entity.User;
import pl.savings.wealthvoyage.repository.UserRepository;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
@AllArgsConstructor
public class AdminController {
    private final UserRepository userRepository;
    @GetMapping("/admin")
    public User admin() {
        Optional<User> user = userRepository.findByUsername("admin");
        return user.get();
    }
}
