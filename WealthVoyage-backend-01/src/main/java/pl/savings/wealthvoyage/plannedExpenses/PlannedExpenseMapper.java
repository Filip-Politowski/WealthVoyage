package pl.savings.wealthvoyage.plannedExpenses;

import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class PlannedExpenseMapper {
    public PlannedExpense toPlannedExpense(PlannedExpenseRequest request) {
        if (request == null) {
            throw new NullPointerException("Request cannot be null");
        }
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
        if (plannedExpense == null) {
            throw new NullPointerException("PlannedExpense cannot be null");
        }
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

    public List<PlannedExpenseResponse> toPlannedExpenseResponseList(List<PlannedExpense> plannedExpenses) {
        if(plannedExpenses == null){
            throw new NullPointerException("PlannedExpenses cannot be null");
        }
        return plannedExpenses.stream()
                .map(this::toPlannedExpenseResponse)
                .collect(Collectors.toList());
    }
}
