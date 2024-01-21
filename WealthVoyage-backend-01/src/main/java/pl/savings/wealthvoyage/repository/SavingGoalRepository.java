package pl.savings.wealthvoyage.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.savings.wealthvoyage.entity.SavingGoal;

public interface SavingGoalRepository extends JpaRepository<SavingGoal, Long> {
}
