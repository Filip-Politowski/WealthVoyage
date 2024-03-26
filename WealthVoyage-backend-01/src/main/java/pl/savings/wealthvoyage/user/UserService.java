package pl.savings.wealthvoyage.user;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public UserResponse findByUsername(String username) {

        Optional<User> user = userRepository.findByUsername(username);
        return user.map(value -> UserResponse.builder()
                .username(value.getUsername())
                .firstName(value.getFirstName())
                .lastName(value.getLastName())
                .email(value.getEmail())
                .build()).orElse(null);
    }
}
