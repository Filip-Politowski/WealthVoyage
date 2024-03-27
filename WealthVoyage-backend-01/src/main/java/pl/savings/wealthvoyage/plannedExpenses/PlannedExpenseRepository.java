package pl.savings.wealthvoyage.plannedExpenses;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PlannedExpenseRepository extends JpaRepository<PlannedExpense, Integer> {
    Optional<List<PlannedExpense>> findAllByUsername(String username);
}
