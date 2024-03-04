package pl.savings.wealthvoyage.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.savings.wealthvoyage.entity.LoginResponseDTO;
import pl.savings.wealthvoyage.entity.RegistrationDTO;
import pl.savings.wealthvoyage.entity.User;
import pl.savings.wealthvoyage.service.AuthenticationService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthenticationController {

    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/register")
    public User registerUser(@RequestBody RegistrationDTO body){
        return authenticationService.registerUser(body.getUsername(), body.getPassword(), body.getEmail(),body.getFirstName(),body.getLastName());
    }

    @PostMapping("/login")
    public LoginResponseDTO loginUser(@RequestBody RegistrationDTO body){
        return authenticationService.loginUser(body.getUsername(), body.getPassword());
    }
}
