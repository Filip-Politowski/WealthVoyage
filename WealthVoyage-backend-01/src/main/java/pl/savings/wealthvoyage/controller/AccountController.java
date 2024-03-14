package pl.savings.wealthvoyage.controller;

import lombok.Data;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/api/account")
public class AccountController {

    @GetMapping("/hello")
    public String hello(Authentication authentication) {
        System.out.println(authentication.getAuthorities());
        return "Hello World";
    }
}
