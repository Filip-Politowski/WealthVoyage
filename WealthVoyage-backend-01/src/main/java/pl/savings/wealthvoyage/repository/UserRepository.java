package pl.savings.wealthvoyage.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.savings.wealthvoyage.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {
}
