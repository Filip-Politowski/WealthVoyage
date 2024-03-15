package pl.savings.wealthvoyage.transactions;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.savings.wealthvoyage.transactions.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
}
