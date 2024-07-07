package pl.savings.wealthvoyage.recurringExpense;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecurringExpenseRequest {
    private Long id;
    private String username;
    private String expenseName;
    private ExpenseType expenseType;
    private Double amount;
    private ExpenseFrequency expenseFrequency;
    private String description;
    private Date date;

}
