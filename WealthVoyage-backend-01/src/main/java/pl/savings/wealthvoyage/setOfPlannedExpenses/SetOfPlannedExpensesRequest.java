package pl.savings.wealthvoyage.setOfPlannedExpenses;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.savings.wealthvoyage.plannedExpenses.PlannedExpense;

import java.util.List;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SetOfPlannedExpensesRequest {

    private Long id;
    private String name;
    private Double amount;

}
