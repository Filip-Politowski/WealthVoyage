package pl.savings.wealthvoyage;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
public class WealthVoyageApplication {

    public static void main(String[] args) {
        SpringApplication.run(WealthVoyageApplication.class, args);
    }
}
