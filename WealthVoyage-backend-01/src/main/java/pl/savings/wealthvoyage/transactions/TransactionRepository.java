package pl.savings.wealthvoyage.transactions;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.savings.wealthvoyage.loans.Loan;
import pl.savings.wealthvoyage.transactions.Transaction;

import java.util.List;
import java.util.Optional;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

   List<Transaction> findAllByLoanIdAndUsername(Long id, String username);

    List<Transaction> findAllByUsername(String username);
}
