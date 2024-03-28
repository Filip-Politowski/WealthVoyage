package pl.savings.wealthvoyage.plannedExpenses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PlannedExpenseRequest {
    private Long id;
    private String category;
    private double amount;
    private String paymentDate;
    private Status status;
    private Integer priority;
    private String description;
    private PaymentMethod paymentMethod;

}
