package pl.savings.wealthvoyage.plannedExpenses;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PlannedExpenseService {
    private final PlannedExpenseRepository plannedExpenseRepository;


    public List<PlannedExpenseResponse> getAllPlannedExpensesByUsername(UserDetails userDetails) {

        Optional<List<PlannedExpense>> plannedExpensesOptional = plannedExpenseRepository.findAllByUsername(userDetails.getUsername());
        return plannedExpensesOptional.map(plannedExpenses ->
                        plannedExpenses.stream()
                                .map(plannedExpense -> PlannedExpenseResponse.builder()
                                        .id(plannedExpense.getId())
                                        .category(plannedExpense.getCategory())
                                        .amount(plannedExpense.getAmount())
                                        .paymentDate(plannedExpense.getPaymentDate())
                                        .status(plannedExpense.getStatus())
                                        .priority(plannedExpense.getPriority())
                                        .description(plannedExpense.getDescription())
                                        .paymentMethod(plannedExpense.getPaymentMethod())
                                        .build())
                                .collect(Collectors.toList()))
                .orElseGet(Collections::emptyList);
    }


    public PlannedExpenseResponse getUserPlannedExpenseById(Long id, UserDetails userDetails) {
        Optional<PlannedExpense> optionalPlannedExpense = plannedExpenseRepository.findByIdAndUsername(id, userDetails.getUsername());
        return optionalPlannedExpense.map(plannedExpense -> PlannedExpenseResponse.builder()
                .id(plannedExpense.getId())
                .category(plannedExpense.getCategory())
                .amount(plannedExpense.getAmount())
                .paymentDate(plannedExpense.getPaymentDate())
                .status(plannedExpense.getStatus())
                .priority(plannedExpense.getPriority())
                .description(plannedExpense.getDescription())
                .paymentMethod(plannedExpense.getPaymentMethod())
                .build()).orElseThrow(NoSuchElementException::new);
    }

    @Transactional
    public void deleteUserPlannedExpenseById(Long id, UserDetails userDetails) {
        plannedExpenseRepository.deleteByIdAndUsername(id, userDetails.getUsername());
    }

    public void saveUserPlannedExpense(PlannedExpenseRequest plannedExpenseRequest, UserDetails userDetails) {
        plannedExpenseRepository.save(PlannedExpense.builder()
                .category(plannedExpenseRequest.getCategory())
                .amount(plannedExpenseRequest.getAmount())
                .paymentDate(plannedExpenseRequest.getPaymentDate())
                .status(plannedExpenseRequest.getStatus())
                .priority(plannedExpenseRequest.getPriority())
                .description(plannedExpenseRequest.getDescription())
                .paymentMethod(plannedExpenseRequest.getPaymentMethod())
                .username(userDetails.getUsername())
                .build());
    }

    public void updateUserPlannedExpense(Long id, PlannedExpenseRequest plannedExpenseRequest, UserDetails userDetails) {
        plannedExpenseRepository.save(PlannedExpense.builder()
                .id(id)
                .category(plannedExpenseRequest.getCategory())
                .amount(plannedExpenseRequest.getAmount())
                .paymentDate(plannedExpenseRequest.getPaymentDate())
                .status(plannedExpenseRequest.getStatus())
                .priority(plannedExpenseRequest.getPriority())
                .description(plannedExpenseRequest.getDescription())
                .paymentMethod(plannedExpenseRequest.getPaymentMethod())
                .username(userDetails.getUsername())
                .build());
    }
}
