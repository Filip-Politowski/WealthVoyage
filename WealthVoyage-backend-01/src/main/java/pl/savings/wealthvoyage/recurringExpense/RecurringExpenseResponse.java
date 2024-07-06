package pl.savings.wealthvoyage.recurringExpense;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.awt.*;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecurringExpenseResponse {
    private Long id;
    private String expenseName;
    private ExpenseType expenseType;
    private Double amount;
    private ExpenseFrequency expenseFrequency;
    private String description;
    private String paymentDate;

}
