package pl.savings.wealthvoyage.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import pl.savings.wealthvoyage.entity.User;
import pl.savings.wealthvoyage.service.TokenService;
import pl.savings.wealthvoyage.service.UserService;

import java.security.Principal;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final TokenService tokenService;

    @GetMapping("/get")
    public String getUser(Authentication authentication) {
        return tokenService.refreshToken(authentication);

    }

    @PostMapping("/post")
    public String test() {
        return "Post Maping";
    }
}
