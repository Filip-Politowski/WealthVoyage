package pl.savings.wealthvoyage.recurringExpense;

import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import pl.savings.wealthvoyage.recurringExpense.RecurringExpense;
import pl.savings.wealthvoyage.recurringExpense.RecurringExpenseMapper;
import pl.savings.wealthvoyage.recurringExpense.RecurringExpenseRepository;
import pl.savings.wealthvoyage.recurringExpense.RecurringExpenseResponse;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class RecurringExpenseService {
    private final RecurringExpenseRepository recurringExpenseRepository;
    private final RecurringExpenseMapper recurringExpenseMapper;

    public RecurringExpenseResponse  getUserRecurringExpense(Long id, @NotNull UserDetails userDetails) {
        RecurringExpense recurringExpense = recurringExpenseRepository.findByIdAndUsername(id,userDetails.getUsername()).orElseThrow();
        return recurringExpenseMapper.toRecurringExpenseResponse(recurringExpense);
    }
    public List<RecurringExpenseResponse> getUserRecurringExpenses(UserDetails userDetails) {
        return recurringExpenseMapper.toRecurringExpenseResponses(recurringExpenseRepository.findAllByUsername(userDetails.getUsername()).orElseThrow(NoSuchElementException::new));
    }
    public RecurringExpense saveUserRecurringExpense(RecurringExpenseRequest recurringExpenseRequest, @NotNull UserDetails userDetails) {
        RecurringExpense recurringExpense = recurringExpenseMapper.toRecurringExpense(recurringExpenseRequest);
        recurringExpense.setUsername(userDetails.getUsername());
        return recurringExpenseRepository.save(recurringExpense);
    }
    public void deleteUserRecurringExpenseById(Long id, @NotNull UserDetails userDetails) {
        recurringExpenseRepository.deleteByIdAndUsername(id, userDetails.getUsername());
    }
    public void updateUserRecurringExpense(Long id, RecurringExpenseRequest recurringExpenseRequest, @NotNull UserDetails userDetails) {
        RecurringExpense recurringExpense = recurringExpenseMapper.toRecurringExpense(recurringExpenseRequest);
        recurringExpense.setUsername(userDetails.getUsername());
        recurringExpense.setId(id);
        recurringExpenseRepository.save(recurringExpense);
    }
    public Double getUserRecurringExpensesMonthlySum(@NotNull UserDetails userDetails) {
        return recurringExpenseRepository.findAllByUsername(userDetails.getUsername()).orElseThrow(NoSuchElementException::new)
                .stream()
                .filter(recurringExpense -> recurringExpense.getExpenseFrequency().equals(ExpenseFrequency.MONTHLY))
                .mapToDouble(RecurringExpense::getAmount)
                .sum();
    }
}
