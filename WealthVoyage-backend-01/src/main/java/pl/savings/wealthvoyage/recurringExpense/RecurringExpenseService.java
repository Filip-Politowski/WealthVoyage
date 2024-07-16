package pl.savings.wealthvoyage.recurringExpense;

import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.YearMonth;
import java.time.ZoneId;
import java.util.*;
import java.util.stream.Collectors;

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

    public Map<String, Double> getUserSumsOfExpensesInCurrentMonth(UserDetails userDetails) {
        YearMonth currentMonth = YearMonth.now();
        LocalDate startLocalDate = currentMonth.atDay(1);
        LocalDate endLocalDate = currentMonth.atEndOfMonth();

        Date startDate = Date.from(startLocalDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
        Date endDate = Date.from(endLocalDate.atStartOfDay(ZoneId.systemDefault()).toInstant());

        List<RecurringExpense> listOfRecurringExpensesInCurrentMonth = recurringExpenseRepository.findAllByUsernameAndCurrentMonth(userDetails.getUsername(), startDate, endDate);

        Double sumOfWeeklyRecurringExpenses= listOfRecurringExpensesInCurrentMonth.stream().filter(recurringExpense -> recurringExpense.getExpenseFrequency().equals(ExpenseFrequency.WEEKLY)).mapToDouble(RecurringExpense::getAmount).sum();
        Double sumOfMonthlyRecurringExpenses = listOfRecurringExpensesInCurrentMonth.stream().filter(recurringExpense -> recurringExpense.getExpenseFrequency().equals(ExpenseFrequency.MONTHLY)).mapToDouble(RecurringExpense::getAmount).sum();
        Double sumOfBimonthlyRecurringExpenses = listOfRecurringExpensesInCurrentMonth.stream().filter(recurringExpense -> recurringExpense.getExpenseFrequency().equals(ExpenseFrequency.BIMONTHLY)).mapToDouble(RecurringExpense::getAmount).sum();
        Double sumOfYearlyRecurringExpenses = listOfRecurringExpensesInCurrentMonth.stream().filter(recurringExpense -> recurringExpense.getExpenseFrequency().equals(ExpenseFrequency.YEARLY)).mapToDouble(RecurringExpense::getAmount).sum();

        Map<String, Double> totalsDependingOnFrequencyOfOccurrence = new HashMap<>();

        totalsDependingOnFrequencyOfOccurrence.put(ExpenseFrequency.WEEKLY.toString(), sumOfWeeklyRecurringExpenses);
        totalsDependingOnFrequencyOfOccurrence.put(ExpenseFrequency.MONTHLY.toString(), sumOfMonthlyRecurringExpenses);
        totalsDependingOnFrequencyOfOccurrence.put(ExpenseFrequency.BIMONTHLY.toString(), sumOfBimonthlyRecurringExpenses);
        totalsDependingOnFrequencyOfOccurrence.put(ExpenseFrequency.YEARLY.toString(), sumOfYearlyRecurringExpenses);

        System.out.println(totalsDependingOnFrequencyOfOccurrence);

        return totalsDependingOnFrequencyOfOccurrence;
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
