package pl.savings.wealthvoyage.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "saving_goal")
public class SavingGoal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column (name = "user_email")
    private String userEmail;

    @Column (name = "saving_goal_name")
    private String savingGoalName;

    @Column (name = "saving_goal_amount")
    private double savingGoalAmount;

    @Column (name = "amount_saved")
    private double amountSaved;

    @Column (name = "savings_progression")
    private double savingsProgression;
}
