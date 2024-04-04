package pl.savings.wealthvoyage.savingGoals;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.savings.wealthvoyage.plannedExpenses.PlannedExpense;

import java.util.List;
import java.util.Optional;

@Repository
public interface SavingGoalRepository extends JpaRepository<SavingGoal, Long> {
    Optional<List<SavingGoal>> findAllByUsername(String username);
    Optional<SavingGoal> findByIdAndUsername(Long id, String username);
    void deleteByIdAndUsername(Long id, String username);
}
