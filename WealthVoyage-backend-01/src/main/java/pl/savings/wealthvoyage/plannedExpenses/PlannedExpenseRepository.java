package pl.savings.wealthvoyage.plannedExpenses;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PlannedExpenseRepository extends JpaRepository<PlannedExpense, Long> {
    Optional<Page<PlannedExpense>> findAllByUsername(String username, Pageable pageable);
    Optional<PlannedExpense> findByIdAndUsername(Long id, String username);
    void deleteByIdAndUsername(Long id, String username);
}
