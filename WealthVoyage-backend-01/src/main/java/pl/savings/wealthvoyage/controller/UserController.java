package pl.savings.wealthvoyage.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class UserController {
    @GetMapping("/user")
    public String helloUserController () {
        return "Hello UserController";
    }
}
