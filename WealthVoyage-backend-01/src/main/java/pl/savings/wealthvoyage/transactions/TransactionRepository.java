package pl.savings.wealthvoyage.transactions;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pl.savings.wealthvoyage.income.Income;
import pl.savings.wealthvoyage.loans.Loan;
import pl.savings.wealthvoyage.plannedExpenses.PlannedExpense;
import pl.savings.wealthvoyage.singleExpense.SingleExpense;
import pl.savings.wealthvoyage.transactions.Transaction;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    List<Transaction> findAllByLoanIdAndUsername(Long id, String username);

    Transaction findByUsernameAndSingleExpense(String username, SingleExpense singleExpense);

    Transaction findByUsernameAndIncome(String username, Income income);

    Transaction findByUsernameAndId(String username, long id);

    Page<Transaction> findAllByUsername(String username, Pageable pageable);

    void deleteByUsernameAndId(String username, long id);

    void deleteByUsernameAndPlannedExpense(String username, PlannedExpense plannedExpense);

    void deleteByUsernameAndSingleExpense(String username, SingleExpense singleExpense);

    void deleteByUsernameAndIncome(String username, Income income);

    @Query("SELECT SUM(t.amount) FROM Transaction t WHERE t.date BETWEEN :startDate AND :endDate AND t.username =:username AND t.transactionCategory =:transactionCategory ")
    Double getTransactionsByTransactionCategory(@Param("transactionCategory") TransactionCategory transactionCategory, @Param("startDate") Date startDate, @Param("endDate") Date endDate);
}
