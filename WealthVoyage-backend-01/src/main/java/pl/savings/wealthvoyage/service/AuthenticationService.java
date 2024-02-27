package pl.savings.wealthvoyage.service;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.savings.wealthvoyage.entity.Role;
import pl.savings.wealthvoyage.entity.User;
import pl.savings.wealthvoyage.repository.RoleRepository;
import pl.savings.wealthvoyage.repository.UserRepository;

import java.util.HashSet;
import java.util.Set;

@Service
@Transactional
@Data
@AllArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public User registerUser(String username, String password){

        String encodedPassword = passwordEncoder.encode(password);
        Role userRole = roleRepository.findByAuthority("User").get();

        Set<Role> authorities = new HashSet<>();

        authorities.add(userRole);

        return userRepository.save(new User(0,username, encodedPassword,authorities));
    }

}
