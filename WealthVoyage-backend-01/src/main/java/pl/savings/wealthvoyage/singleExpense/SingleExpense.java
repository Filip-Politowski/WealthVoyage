package pl.savings.wealthvoyage.singleExpense;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.savings.wealthvoyage.transactions.Transaction;

import java.util.Date;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "single_expense")
public class SingleExpense {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private Double amount;
    @Column(name = "date")
    @Temporal(TemporalType.DATE)
    private Date date;
    private String description;
    @Enumerated(EnumType.STRING)
    private ExpenseCategory expenseCategory;
    @OneToOne(mappedBy = "singleExpense")
    private Transaction transaction;
}
