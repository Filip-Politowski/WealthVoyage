package pl.savings.wealthvoyage.plannedExpenses;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PlannedExpenseService {
    private final PlannedExpenseRepository plannedExpenseRepository;


    public List<PlannedExpenseResponse> getPlannedExpenses(String username) {

        Optional<List<PlannedExpense>> plannedExpensesOptional = plannedExpenseRepository.findAllByUsername(username);
        return plannedExpensesOptional.map(plannedExpenses ->
                        plannedExpenses.stream()
                                .map(plannedExpense -> PlannedExpenseResponse.builder()
                                        .category(plannedExpense.getCategory())
                                        .amount(plannedExpense.getAmount())
                                        .paymentDate(plannedExpense.getPaymentDate())
                                        .status(plannedExpense.getStatus())
                                        .priority(plannedExpense.getPriority())
                                        .description(plannedExpense.getDescription())
                                        .paymentMethod(plannedExpense.getPaymentMethod())
                                        .username(plannedExpense.getUsername())
                                        .build())
                                .collect(Collectors.toList()))
                .orElseGet(Collections::emptyList);
    }


}
