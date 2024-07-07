package pl.savings.wealthvoyage.recurringExpense;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.savings.wealthvoyage.singleExpense.SingleExpense;

import java.util.List;
import java.util.Optional;
@Repository
public interface RecurringExpenseRepository extends JpaRepository<RecurringExpense, Long> {
    Optional<RecurringExpense> findByIdAndUsername(Long id, String username);

    Optional<Page<RecurringExpense>> findAllByUsername(String username, Pageable pageable);

    void deleteByIdAndUsername(Long id, String username);
}
