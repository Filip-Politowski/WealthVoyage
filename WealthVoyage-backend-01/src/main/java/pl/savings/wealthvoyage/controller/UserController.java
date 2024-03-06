package pl.savings.wealthvoyage.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @GetMapping("/get")
    public String getUser() {
        return "Hello motherfucker";
    }

    @PostMapping("/post")
    public String test(){
        return "Post Maping";
    }
}
