package pl.savings.wealthvoyage.recurringExpense;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class RecurringExpense {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String expenseName;
    @Enumerated(EnumType.STRING)
    private ExpenseType expenseType;
    private Double amount;
    @Enumerated(EnumType.STRING)
    private ExpenseFrequency expenseFrequency;
    private String description;
    @Temporal(TemporalType.DATE)
    private Date date;



}
