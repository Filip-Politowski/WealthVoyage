package pl.savings.wealthvoyage.singleExpense;

import org.springframework.stereotype.Component;
import pl.savings.wealthvoyage.transactions.Transaction;
import pl.savings.wealthvoyage.transactions.TransactionRequest;
import pl.savings.wealthvoyage.transactions.TransactionResponse;

import java.util.List;

@Component
public class SingleExpenseMapper {
    public SingleExpense toSingleExpense(SingleExpenseRequest request) {
        if (request == null) {
            throw new NullPointerException("Expense cannot be null");
        }
        return SingleExpense.builder()
                .id(request.getId())
                .expenseCategory(request.getExpenseCategory())
                .amount(request.getAmount())
                .description(request.getDescription())
                .username(request.getUsername())
                .date(request.getDate())
                .build();
    }

    public SingleExpenseResponse toSingleExpenseResponse(SingleExpense singleExpense) {
        if (singleExpense == null) {
            throw new NullPointerException("Expense cannot be null");
        }
        return SingleExpenseResponse.builder()
                .id(singleExpense.getId())
                .expenseCategory(singleExpense.getExpenseCategory())
                .amount(singleExpense.getAmount())
                .description(singleExpense.getDescription())
                .date(singleExpense.getDate())
                .build();
    }

    public List<SingleExpenseResponse> toSingleExpenseResponses(List<SingleExpense> singleExpenses) {
        if (singleExpenses == null) {
            throw new NullPointerException("Single expenses cannot be empty");
        }
        return singleExpenses.stream().map(this::toSingleExpenseResponse).toList();
    }
}
