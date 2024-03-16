package pl.savings.wealthvoyage.plannedExpenses;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlannedExpenseRepository extends JpaRepository<PlannedExpense, Integer> {
}
