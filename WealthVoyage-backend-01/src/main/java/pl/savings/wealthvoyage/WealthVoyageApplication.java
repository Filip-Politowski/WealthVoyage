package pl.savings.wealthvoyage;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import pl.savings.wealthvoyage.entity.Role;
import pl.savings.wealthvoyage.entity.User;
import pl.savings.wealthvoyage.repository.RoleRepository;
import pl.savings.wealthvoyage.repository.UserRepository;

import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
public class WealthVoyageApplication {

    public static void main(String[] args) {
        SpringApplication.run(WealthVoyageApplication.class, args);
    }

    @Bean
    CommandLineRunner run(RoleRepository roleRepository, UserRepository userRepository, PasswordEncoder passwordEncode) {
        return args -> {
            if (roleRepository.findByAuthority("ADMIN").isPresent()) return;
            Role adminRole = roleRepository.save(new Role("ADMIN"));
            roleRepository.save(new Role("USER"));

            Set<Role> roles = new HashSet<>();
            roles.add(adminRole);

            User admin = new User(1, "admin","admin","admin", passwordEncode.encode("password"),"admin@admin.pl", roles);

            userRepository.save(admin);
        };
    }
}
