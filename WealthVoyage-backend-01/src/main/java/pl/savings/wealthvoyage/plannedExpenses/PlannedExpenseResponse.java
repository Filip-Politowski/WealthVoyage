package pl.savings.wealthvoyage.plannedExpenses;

import lombok.*;

import java.util.Date;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

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
    @Min(1)
    @Max(5)
    private Integer priority;
    private String description;
    private PaymentMethod paymentMethod;

}
