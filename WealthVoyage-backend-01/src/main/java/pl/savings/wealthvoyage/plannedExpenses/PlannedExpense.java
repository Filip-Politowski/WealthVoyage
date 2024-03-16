package pl.savings.wealthvoyage.plannedExpenses;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.savings.wealthvoyage.savingGoals.SavingGoal;



@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "planned_expenses")
public class PlannedExpense {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer Id;

    private String category;

    private double amount;

    private String date;

    @Enumerated(EnumType.STRING)
    private Status status;

    private Integer priority;

    private String description;

    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod;

    @ManyToOne
    @JoinColumn(name = "saving_goal_id")
    private SavingGoal savingGoal;


}
