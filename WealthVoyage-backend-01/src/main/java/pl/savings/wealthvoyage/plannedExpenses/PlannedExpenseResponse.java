package pl.savings.wealthvoyage.plannedExpenses;

import lombok.*;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PlannedExpenseResponse {

    private String category;
    private double amount;
    private String paymentDate;
    private Status status;
    private Integer priority;
    private String description;
    private PaymentMethod paymentMethod;
    private String username;

}
