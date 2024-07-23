package pl.savings.wealthvoyage.plannedExpenses;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.savings.wealthvoyage.savingGoals.SavingGoal;

import java.util.Date;


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

    private String name;

    private double amount;
    @Column(name = "payment_date")
    @Temporal(TemporalType.DATE)
    private Date paymentDate;

    @Enumerated(EnumType.STRING)
    private Status status;

    private Integer priority;

    private String description;

    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod;

    private String username ;




}
