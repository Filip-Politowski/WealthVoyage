package pl.savings.wealthvoyage.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.savings.wealthvoyage.entity.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
}
