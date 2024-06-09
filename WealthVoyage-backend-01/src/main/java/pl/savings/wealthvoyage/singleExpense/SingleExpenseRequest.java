package pl.savings.wealthvoyage.singleExpense;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SingleExpenseRequest {
    private Long id;
    private String username;
    private Double amount;
    private Date date;
    private String description;
    private ExpenseCategory expenseCategory;
}
