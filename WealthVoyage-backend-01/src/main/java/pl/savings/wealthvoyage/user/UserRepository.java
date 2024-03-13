package pl.savings.wealthvoyage.user;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.savings.wealthvoyage.user.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByUsername(String username);

}
