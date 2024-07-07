package pl.savings.wealthvoyage.recurringExpense;

import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class RecurringExpenseService {
    private final RecurringExpenseRepository recurringExpenseRepository;
    private final RecurringExpenseMapper recurringExpenseMapper;

    public RecurringExpenseResponse getUserRecurringExpense(Long id, @NotNull UserDetails userDetails) {
        RecurringExpense recurringExpense = recurringExpenseRepository.findByIdAndUsername(id, userDetails.getUsername()).orElseThrow();
        return recurringExpenseMapper.toRecurringExpenseResponse(recurringExpense);
    }

    public Page<RecurringExpenseResponse> getUserRecurringExpenses(UserDetails userDetails, Pageable pageable) {
        Page<RecurringExpense> recurringExpensePage = recurringExpenseRepository.findAllByUsername(userDetails.getUsername(), pageable).orElseThrow(NoSuchElementException::new);
        return recurringExpensePage.map(recurringExpenseMapper::toRecurringExpenseResponse);
    }

    public Page<RecurringExpenseResponse> getUserRecurringExpensesByExpenseFrequency(UserDetails userDetails, ExpenseFrequency expenseFrequency, Pageable pageable) {
        Page<RecurringExpense> recurringExpensePage = recurringExpenseRepository.findAllByUsernameAndExpenseFrequency(userDetails.getUsername(), expenseFrequency, pageable).orElseThrow(NoSuchElementException::new);
        return recurringExpensePage.map(recurringExpenseMapper::toRecurringExpenseResponse);
    }


    public RecurringExpense saveUserRecurringExpense(RecurringExpenseRequest recurringExpenseRequest, @NotNull UserDetails userDetails) {
        RecurringExpense recurringExpense = recurringExpenseMapper.toRecurringExpense(recurringExpenseRequest);
        recurringExpense.setUsername(userDetails.getUsername());
        return recurringExpenseRepository.save(recurringExpense);
    }

    @Transactional
    public void deleteUserRecurringExpenseById(Long id, @NotNull UserDetails userDetails) {
        recurringExpenseRepository.deleteByIdAndUsername(id, userDetails.getUsername());
    }

    public void updateUserRecurringExpense(Long id, RecurringExpenseRequest recurringExpenseRequest, @NotNull UserDetails userDetails) {
        RecurringExpense recurringExpense = recurringExpenseMapper.toRecurringExpense(recurringExpenseRequest);
        recurringExpense.setUsername(userDetails.getUsername());
        recurringExpense.setId(id);
        recurringExpenseRepository.save(recurringExpense);
    }

    public Double getUserRecurringExpensesMonthlySum(@NotNull UserDetails userDetails, Pageable pageable) {
        return recurringExpenseRepository.findAllByUsername(userDetails.getUsername(), pageable).orElseThrow(NoSuchElementException::new)
                .stream()
                .filter(recurringExpense -> recurringExpense.getExpenseFrequency().equals(ExpenseFrequency.MONTHLY))
                .mapToDouble(RecurringExpense::getAmount)
                .sum();
    }

    public Double getUserRecurringExpensesYearlySum(@NotNull UserDetails userDetails, Pageable pageable) {
        return recurringExpenseRepository.findAllByUsername(userDetails.getUsername(), pageable).orElseThrow(NoSuchElementException::new)
                .stream()
                .filter(recurringExpense -> recurringExpense.getExpenseFrequency().equals(ExpenseFrequency.YEARLY))
                .mapToDouble(RecurringExpense::getAmount)
                .sum();
    }
}
