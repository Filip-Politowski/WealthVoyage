package pl.savings.wealthvoyage.plannedExpenses;

import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
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
    private final PlannedExpenseMapper plannedExpenseMapper;

    public List<PlannedExpenseResponse> getAllPlannedExpensesByUsername(@NotNull UserDetails userDetails) {

        Optional<List<PlannedExpense>> plannedExpensesOptional = plannedExpenseRepository.findAllByUsername(userDetails.getUsername());
        return plannedExpensesOptional.map(plannedExpenses ->
                        plannedExpenses.stream()
                                .map(plannedExpenseMapper::toPlannedExpenseResponse)
                                .collect(Collectors.toList()))
                .orElseGet(Collections::emptyList);
    }


    public PlannedExpenseResponse getUserPlannedExpenseById(Long id, @NotNull UserDetails userDetails) {
        Optional<PlannedExpense> optionalPlannedExpense = plannedExpenseRepository.findByIdAndUsername(id, userDetails.getUsername());
        return optionalPlannedExpense.map(plannedExpenseMapper::toPlannedExpenseResponse).orElseThrow(NoSuchElementException::new);
    }

    @Transactional
    public void deleteUserPlannedExpenseById(Long id, @NotNull UserDetails userDetails) {
        plannedExpenseRepository.deleteByIdAndUsername(id, userDetails.getUsername());
    }

    public PlannedExpense saveUserPlannedExpense(PlannedExpenseRequest plannedExpenseRequest, UserDetails userDetails) {
        PlannedExpense plannedExpense = plannedExpenseMapper.toPlannedExpense(plannedExpenseRequest);
        plannedExpense.setUsername(userDetails.getUsername());
        plannedExpenseRepository.save(plannedExpense);
        return plannedExpense;
    }

    public void updateUserPlannedExpense(Long id, PlannedExpenseRequest plannedExpenseRequest, @NotNull UserDetails userDetails) {
        PlannedExpense plannedExpense = plannedExpenseMapper.toPlannedExpense(plannedExpenseRequest);
        plannedExpense.setUsername(userDetails.getUsername());
        plannedExpense.setId(id);
        plannedExpenseRepository.save(plannedExpense);

    }
}
