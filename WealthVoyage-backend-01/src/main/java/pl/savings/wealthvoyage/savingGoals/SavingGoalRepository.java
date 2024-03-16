package pl.savings.wealthvoyage.savingGoals;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SavingGoalRepository extends JpaRepository<SavingGoal, Long> {
}
