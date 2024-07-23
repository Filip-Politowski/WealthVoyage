package pl.savings.wealthvoyage.plannedExpenses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PlannedExpenseRequest {
    private Long id;
    private String name;
    private double amount;
    private Date paymentDate;
    private Status status;
    private Integer priority;
    private String description;
    private PaymentMethod paymentMethod;

}
