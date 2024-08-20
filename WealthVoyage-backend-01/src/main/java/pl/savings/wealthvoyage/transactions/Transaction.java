package pl.savings.wealthvoyage.transactions;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.savings.wealthvoyage.income.Income;
import pl.savings.wealthvoyage.loans.Loan;
import pl.savings.wealthvoyage.plannedExpenses.PlannedExpense;
import pl.savings.wealthvoyage.recurringExpense.RecurringExpense;
import pl.savings.wealthvoyage.savingGoals.SavingGoal;
import pl.savings.wealthvoyage.singleExpense.SingleExpense;

import java.util.Date;

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

    private String transactionName;

    @Column(name = "transaction_type")
    @Enumerated(EnumType.STRING)
    private TransactionType transactionType;

    @Column(name = "category")
    @Enumerated(EnumType.STRING)
    private TransactionCategory transactionCategory;

    @Column(name = "date")
    @Temporal(TemporalType.DATE)
    private Date date;

    @ManyToOne
    @JoinColumn(name = "loan_id")
    private Loan loan;

    @ManyToOne
    @JoinColumn(name = "saving_goal_id")
    private SavingGoal savingsGoal;

    @ManyToOne
    @JoinColumn(name = "income_id")
    private Income income;

    @OneToOne
    @JoinColumn(name = "single_expense_id")
    private SingleExpense singleExpense;

    @ManyToOne
    @JoinColumn(name = "recurring_expense_id")
    private RecurringExpense recurringExpense;
    @OneToOne
    @JoinColumn(name = "planned_expense_id")
    private PlannedExpense plannedExpense;

}
