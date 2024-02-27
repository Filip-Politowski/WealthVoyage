package pl.savings.wealthvoyage.controller;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.savings.wealthvoyage.entity.RegistrationDTO;
import pl.savings.wealthvoyage.entity.User;
import pl.savings.wealthvoyage.service.AuthenticationService;

@RestController
@Data
@AllArgsConstructor
@RequestMapping("/api/auth")
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public User registerUser(@RequestBody RegistrationDTO body) {
        return authenticationService.registerUser(body.getUserName(), body.getPassword());
    }
}
