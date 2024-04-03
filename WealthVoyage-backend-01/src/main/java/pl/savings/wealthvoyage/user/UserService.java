package pl.savings.wealthvoyage.user;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import java.util.Optional;
@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public UserResponse findByUsername(UserDetails userDetails) {

        Optional<User> user = userRepository.findByUsername(userDetails.getUsername());

        return user.map(value -> UserResponse.builder()
                .username(value.getUsername())
                .firstName(value.getFirstName())
                .lastName(value.getLastName())
                .email(value.getEmail())
                .build()).orElse(null);
    }
}
