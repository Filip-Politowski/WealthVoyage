package pl.savings.wealthvoyage.singleExpense;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SingleExpenseResponse {
    private Long id;
    private Double amount;
    private Date date;
    private String description;
    private ExpenseCategory expenseCategory;
}
