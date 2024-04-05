package pl.savings.wealthvoyage.recurringExpense;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface RecurringExpenseRepository extends JpaRepository<RecurringExpense, Long> {
    Optional<RecurringExpense> findByIdAndUsername(Long id, String username);

    Optional<List<RecurringExpense>> findAllByUsername(String username);

    void deleteByIdAndUsername(Long id, String username);
}
