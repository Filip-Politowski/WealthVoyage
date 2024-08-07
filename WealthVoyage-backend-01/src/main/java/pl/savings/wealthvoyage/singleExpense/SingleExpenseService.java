package pl.savings.wealthvoyage.singleExpense;

import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.savings.wealthvoyage.transactions.TransactionService;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SingleExpenseService {
    private final SingleExpenseRepository singleExpenseRepository;
    private final SingleExpenseMapper singleExpenseMapper;
    private final TransactionService transactionService;


    public SingleExpenseResponse getUserSingleExpenseById(Long id, @NotNull UserDetails userDetails) {
        return singleExpenseMapper.toSingleExpenseResponse(singleExpenseRepository.findByIdAndUsername(id, userDetails.getUsername()));
    }

    public Page<SingleExpenseResponse> getUserAllSingleExpenses(@NotNull UserDetails userDetails, Pageable pageable, ExpenseCategory expenseCategory) {


        if (expenseCategory.equals(ExpenseCategory.All)) {
            Page<SingleExpense> singleExpensePage = singleExpenseRepository.findAllByUsername(userDetails.getUsername(), pageable)
                    .orElseThrow(NoSuchElementException::new);
            return singleExpensePage.map(singleExpenseMapper::toSingleExpenseResponse);
        } else {
            Page<SingleExpense> singleExpensePage = singleExpenseRepository.findAllByUsernameAndExpenseCategory(userDetails.getUsername(), expenseCategory, pageable)
                    .orElseThrow(NoSuchElementException::new);
            return singleExpensePage.map(singleExpenseMapper::toSingleExpenseResponse);
        }
    }

    public Page<SingleExpenseResponse> getUserSingleExpensesByCategoryAndDate(@NotNull UserDetails userDetails, Pageable pageable, ExpenseCategory expenseCategory, Date date) {

        Page<SingleExpense> singleExpensePage;
        if (!expenseCategory.equals(ExpenseCategory.All)) {
            singleExpensePage = singleExpenseRepository.findAllByUsernameAndExpenseCategoryAndDate(userDetails.getUsername(), expenseCategory, pageable, date)
                    .orElseThrow(NoSuchElementException::new);
        } else {
            singleExpensePage = singleExpenseRepository.findAllByUsernameAndDate(userDetails.getUsername(), pageable, date)
                    .orElseThrow(NoSuchElementException::new);
        }
        return singleExpensePage.map(singleExpenseMapper::toSingleExpenseResponse);
    }

    public SingleExpense saveUserSingleExpense(SingleExpenseRequest singleExpenseRequest, @NotNull UserDetails userDetails) {
        SingleExpense singleExpense = singleExpenseMapper.toSingleExpense(singleExpenseRequest);
        singleExpense.setUsername(userDetails.getUsername());
        singleExpenseRepository.save(singleExpense);
        transactionService.addSingleExpenseTransaction(singleExpense);
        return singleExpense;
    }

    @Transactional
    public void deleteUserSingleExpenseById(Long id, @NotNull UserDetails userDetails) {
        SingleExpense singleExpense = singleExpenseRepository.findByIdAndUsername(id, userDetails.getUsername());
        transactionService.deleteTransactionBySingleExpense(userDetails, singleExpense);
        singleExpenseRepository.deleteByIdAndUsername(id, userDetails.getUsername());
    }


    public void updateUserSingleExpense(Long id, SingleExpenseRequest singleExpenseRequest, @NotNull UserDetails userDetails) {
        SingleExpense singleExpense = singleExpenseMapper.toSingleExpense(singleExpenseRequest);
        singleExpense.setUsername(userDetails.getUsername());
        singleExpense.setId(id);
        singleExpenseRepository.save(singleExpense);
        transactionService.updateSingleExpenseTransaction(singleExpense, userDetails);
    }

    public Double calculateTotalExpensesForCurrentMonth(UserDetails userDetails) {
        LocalDate today = LocalDate.now();
        LocalDate startOfMonth = today.withDayOfMonth(1);
        LocalDate endOfMonth = today.withDayOfMonth(today.lengthOfMonth());

        Double totalExpenses = singleExpenseRepository.sumAmountByDateBetweenAndUsername(
                java.sql.Date.valueOf(startOfMonth),
                java.sql.Date.valueOf(endOfMonth),
                userDetails.getUsername()
        );

        return (totalExpenses != null) ? totalExpenses : 0.0;
    }

    public Double calculateTotalExpensesForLastThreeMonths(@NotNull UserDetails userDetails) {
        LocalDate today = LocalDate.now();
        LocalDate startOfThreeMonthsAgo = today.minusMonths(3).withDayOfMonth(1);
        LocalDate endOfThreeMonthsAgo = today.withDayOfMonth(1).minusDays(1);

        return singleExpenseRepository.sumAmountByDateBetweenAndUsername(
                java.sql.Date.valueOf(startOfThreeMonthsAgo),
                java.sql.Date.valueOf(endOfThreeMonthsAgo),
                userDetails.getUsername()
        );
    }

    public Double calculateTotalExpensesForYear(@NotNull UserDetails userDetails) {
        LocalDate today = LocalDate.now();
        LocalDate startOfYear = today.withDayOfYear(1);
        LocalDate endOfYear = today.withDayOfYear(today.lengthOfYear());

        return singleExpenseRepository.sumAmountByDateBetweenAndUsername(
                java.sql.Date.valueOf(startOfYear),
                java.sql.Date.valueOf(endOfYear),
                userDetails.getUsername()
        );
    }


}
