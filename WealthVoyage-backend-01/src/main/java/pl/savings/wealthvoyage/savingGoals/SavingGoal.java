package pl.savings.wealthvoyage.savingGoals;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.savings.wealthvoyage.plannedExpenses.PlannedExpense;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "saving_goal")
public class SavingGoal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "saving_goal_name")
    private String savingGoalName;

    @Column(name = "saving_goal_amount")
    private double savingGoalAmount;

    @Column(name = "amount_saved")
    private double amountSaved;

    @Column(name = "savings_progression")
    private double savingsProgression;

}
