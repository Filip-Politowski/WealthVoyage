package pl.savings.wealthvoyage.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.savings.wealthvoyage.entity.Role;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Integer> {
    Optional<Role> findByAuthority(String authority);
}
