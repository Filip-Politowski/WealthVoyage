package pl.savings.wealthvoyage.singleExpense;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Date;
import java.util.Optional;

@Repository
public interface SingleExpenseRepository extends JpaRepository<SingleExpense, Long> {
    SingleExpense findByIdAndUsername(Long id, String username);

    Optional<Page<SingleExpense>>findAllByUsername(String username, Pageable pageable);
    Optional<Page<SingleExpense>>findAllByUsernameAndDate(String username, Pageable pageable, Date date);
    Optional<Page<SingleExpense>> findAllByUsernameAndExpenseCategory(String username, ExpenseCategory expenseCategory, Pageable pageable);
  Optional<Page<SingleExpense>>findAllByUsernameAndExpenseCategoryAndDate(String username, ExpenseCategory expenseCategory, Pageable pageable, Date date);

    void deleteByIdAndUsername(Long id, String username);
    @Query("SELECT SUM(e.amount) FROM SingleExpense e WHERE e.date BETWEEN :startDate AND :endDate AND e.username = :username")
    Double sumAmountByDateBetweenAndUsername(@Param("startDate") Date startDate, @Param("endDate") Date endDate, @Param("username") String username);
}
