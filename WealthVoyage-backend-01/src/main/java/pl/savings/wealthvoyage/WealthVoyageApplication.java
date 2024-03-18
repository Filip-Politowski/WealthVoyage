package pl.savings.wealthvoyage;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import pl.savings.wealthvoyage.authentication.AuthenticationService;
import pl.savings.wealthvoyage.authentication.RegisterRequest;
import pl.savings.wealthvoyage.user.User;

import java.util.HashSet;
import java.util.Set;

import static pl.savings.wealthvoyage.user.Role.ADMIN;

@SpringBootApplication
public class WealthVoyageApplication {

    public static void main(String[] args) {
        SpringApplication.run(WealthVoyageApplication.class, args);

    }

    @Bean
    public CommandLineRunner commandLineRunner(
            AuthenticationService service
    ) {
        return args -> {
            RegisterRequest admin = RegisterRequest.builder()
                    .firstName("Admin")
                    .lastName("Admin")
                    .email("admin@mail.com")
                    .username("admin")
                    .password("password")
                    .build();
            service.createAdmin(admin);

        };
    }
}
