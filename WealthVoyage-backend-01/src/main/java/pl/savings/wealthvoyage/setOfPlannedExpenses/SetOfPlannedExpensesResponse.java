package pl.savings.wealthvoyage.setOfPlannedExpenses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SetOfPlannedExpensesResponse {
    private Long id;
    private String name;
    private Double amount;
}
