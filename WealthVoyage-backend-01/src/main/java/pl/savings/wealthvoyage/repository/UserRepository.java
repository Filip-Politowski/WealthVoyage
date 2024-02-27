package pl.savings.wealthvoyage.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.savings.wealthvoyage.entity.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByUsername(String username);
}
