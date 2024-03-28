package pl.savings.wealthvoyage.plannedExpenses;

import org.springframework.stereotype.Component;

@Component
public class PlannedExpenseMapper {
    public PlannedExpense toPlannedExpense(PlannedExpenseRequest request) {
        return PlannedExpense.builder()
                .category(request.getCategory())
                .amount(request.getAmount())
                .paymentDate(request.getPaymentDate())
                .status(request.getStatus())
                .priority(request.getPriority())
                .description(request.getDescription())
                .paymentMethod(request.getPaymentMethod())
                .build();
    }

    public PlannedExpenseResponse toPlannedExpenseResponse(PlannedExpense plannedExpense) {
        return PlannedExpenseResponse.builder()
                .id(plannedExpense.getId())
                .category(plannedExpense.getCategory())
                .amount(plannedExpense.getAmount())
                .paymentDate(plannedExpense.getPaymentDate())
                .status(plannedExpense.getStatus())
                .priority(plannedExpense.getPriority())
                .description(plannedExpense.getDescription())
                .paymentMethod(plannedExpense.getPaymentMethod())
                .build();
    }
}
