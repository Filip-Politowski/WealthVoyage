package pl.savings.wealthvoyage.transactions;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.bind.annotation.Mapping;
import pl.savings.wealthvoyage.loans.Loan;
import pl.savings.wealthvoyage.savingGoals.SavingGoal;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "transaction")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    private String username;

    @Column(name = "amount")
    private double amount;

    @Column(name = "transaction_type")
    @Enumerated(EnumType.STRING)
    private TransactionType transactionType;

    @Column(name = "category")
    private String category;

    @Column(name = "date")
    private String date;

    @ManyToOne
    @JoinColumn(name = "loan_id")
    private Loan loan;

    @ManyToOne
    @JoinColumn(name = "saving_goal_id")
    private SavingGoal savingsGoal;

}
