package pl.savings.wealthvoyage.savingGoals;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SavingGoalResponse {
    private Long id;
    private String savingGoalName;
    private double savingGoalAmount;
    private double amountSaved;
}
