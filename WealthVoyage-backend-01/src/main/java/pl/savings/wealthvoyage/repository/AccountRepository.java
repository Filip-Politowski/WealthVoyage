package pl.savings.wealthvoyage.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.savings.wealthvoyage.entity.Account;

public interface AccountRepository extends JpaRepository<Account, Long> {
}
