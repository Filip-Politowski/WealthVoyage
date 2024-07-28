package pl.savings.wealthvoyage.plannedExpenses;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PlannedExpenseService {
    private final PlannedExpenseRepository plannedExpenseRepository;
    private final PlannedExpenseMapper plannedExpenseMapper;

    public Page<PlannedExpenseResponse> getAllPlannedExpensesByUsername(@NotNull UserDetails userDetails, Pageable pageable) {
        Optional<Page<PlannedExpense>> plannedExpensesOptional = plannedExpenseRepository.findAllByUsername(userDetails.getUsername(), pageable);

        if (plannedExpensesOptional.isEmpty()) {

            return new PageImpl<>(Collections.emptyList(), pageable, 0);
        }

        Page<PlannedExpense> plannedExpensesPage = plannedExpensesOptional.get();

        List<PlannedExpense> sortedExpenses = plannedExpensesPage.getContent().stream()
                .sorted((e1, e2) -> {

                    int statusComparison = e2.getStatus().compareTo(e1.getStatus());
                    if (statusComparison != 0) {
                        return statusComparison;
                    }

                    return Integer.compare(e2.getPriority(), e1.getPriority());
                })
                .collect(Collectors.toList());

        List<PlannedExpenseResponse> plannedExpenseResponses = plannedExpenseMapper.toPlannedExpenseResponseList(sortedExpenses);

        return new PageImpl<>(plannedExpenseResponses, pageable, plannedExpensesPage.getTotalElements());
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

    public PlannedExpenseResponse updateUserPlannedExpense(UserDetails userDetails, Long id, Status status) {
        Optional<PlannedExpense> optionalPlannedExpense = plannedExpenseRepository.findByIdAndUsername(id, userDetails.getUsername());
        if (optionalPlannedExpense.isPresent()) {
            PlannedExpense plannedExpense = optionalPlannedExpense.get();
            plannedExpense.setStatus(status);
            return plannedExpenseMapper.toPlannedExpenseResponse(plannedExpenseRepository.save(plannedExpense));
        } else {
            throw new IllegalArgumentException("PlannedExpense not found");
        }
    }
}
