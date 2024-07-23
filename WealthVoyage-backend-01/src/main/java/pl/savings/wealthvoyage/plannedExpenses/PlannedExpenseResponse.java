package pl.savings.wealthvoyage.plannedExpenses;

import lombok.*;

import java.util.Date;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PlannedExpenseResponse {
    private Long id;
    private String name;
    private double amount;
    private Date paymentDate;
    private Status status;
    private Integer priority;
    private String description;
    private PaymentMethod paymentMethod;

}
