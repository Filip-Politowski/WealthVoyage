package pl.savings.wealthvoyage.recurringExpense;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pl.savings.wealthvoyage.singleExpense.SingleExpense;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface RecurringExpenseRepository extends JpaRepository<RecurringExpense, Long> {
    Optional<RecurringExpense> findByIdAndUsername(Long id, String username);

    Optional<Page<RecurringExpense>> findAllByUsername(String username, Pageable pageable);


    @Query("SELECT re FROM RecurringExpense re WHERE re.username= :username AND re.expenseFrequency = :expenseFrequency")
    Optional<Page<RecurringExpense>> findAllByUsernameAndExpenseFrequency(@Param("username") String username, @Param("expenseFrequency") ExpenseFrequency expenseFrequency, Pageable pageable);

    @Query("SELECT re FROM RecurringExpense re WHERE re.username= :username AND re.date BETWEEN :startDate AND :endDate")
    List<RecurringExpense> findAllByUsernameAndCurrentMonth(
            @Param("username") String username,
            @Param("startDate") Date startDate,
            @Param("endDate") Date endDate
    );

    void deleteByIdAndUsername(Long id, String username);
}
