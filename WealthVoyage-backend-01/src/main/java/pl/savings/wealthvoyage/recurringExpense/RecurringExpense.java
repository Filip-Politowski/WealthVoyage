package pl.savings.wealthvoyage.recurringExpense;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

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
    private ExpenseType expenseType;
    private Double amount;
    private ExpenseFrequency expenseFrequency;
    private String description;
    private String paymentDate;



}
