package pl.savings.wealthvoyage.plannedExpenses;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.savings.wealthvoyage.savingGoals.SavingGoal;



@Entity
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "planned_expenses")
public class PlannedExpense {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String category;

    private double amount;

    private String paymentDate;

    @Enumerated(EnumType.STRING)
    private Status status;

    private Integer priority;

    private String description;

    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod;

    private String username ;




}
