package pl.savings.wealthvoyage.recurringExpense;

import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class RecurringExpenseMapper {
    public RecurringExpense toRecurringExpense(RecurringExpenseRequest request) {
        return RecurringExpense.builder()
                .id(request.getId())
                .expenseType(request.getExpenseType())
                .expenseFrequency(request.getExpenseFrequency())
                .amount(request.getAmount())
                .date(request.getDate())
                .expenseName(request.getExpenseName())
                .description(request.getDescription())
                .build();
    }
    public RecurringExpenseResponse toRecurringExpenseResponse(RecurringExpense recurringExpense) {
        return RecurringExpenseResponse.builder()
                .id(recurringExpense.getId())
                .expenseType(recurringExpense.getExpenseType())
                .expenseFrequency(recurringExpense.getExpenseFrequency())
                .amount(recurringExpense.getAmount())
                .date(recurringExpense.getDate())
                .expenseName(recurringExpense.getExpenseName())
                .description(recurringExpense.getDescription())
                .build();
    }
    public List<RecurringExpenseResponse> toRecurringExpenseResponses(List<RecurringExpense> recurringExpenses) {
        return recurringExpenses.stream().map(this::toRecurringExpenseResponse).toList();
    }
}
