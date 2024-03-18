package pl.savings.wealthvoyage.demoControllers;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @GetMapping
    public String get() {
        return "GET::admin";
    }

    @PostMapping
    public String post() {
        return "POST::admin";
    }

    @DeleteMapping
    public String delete() {
        return "DELETE::admin";
    }

    @PutMapping
    public String update() {
        return "PUT::admin";
    }

}
