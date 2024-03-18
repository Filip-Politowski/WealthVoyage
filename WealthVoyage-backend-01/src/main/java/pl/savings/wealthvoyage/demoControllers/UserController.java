package pl.savings.wealthvoyage.demoControllers;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @GetMapping
    public String get() {
        return "GET::user";
    }

    @PostMapping
    public String post() {
        return "POST::user";
    }

    @DeleteMapping
    public String delete() {
        return "DELETE::user";
    }

    @PutMapping
    public String update() {
        return "PUT::user";
    }
}
