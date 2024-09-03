package pl.savings.wealthvoyage.transactions;

import lombok.RequiredArgsConstructor;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.savings.wealthvoyage.income.*;
import pl.savings.wealthvoyage.loans.Loan;
import pl.savings.wealthvoyage.plannedExpenses.PlannedExpense;
import pl.savings.wealthvoyage.recurringExpense.RecurringExpense;
import pl.savings.wealthvoyage.savingGoals.SavingGoal;
import pl.savings.wealthvoyage.singleExpense.SingleExpense;


import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TransactionService {
    private final TransactionRepository transactionRepository;
    private final TransactionMapper transactionMapper;

    public void addTransaction(Transaction transaction) {
        transactionRepository.save(transaction);
    }


    public List<TransactionResponse> findAllTransactionsByLoanId(Long id, UserDetails userDetails) {
        return transactionMapper.toTransactionResponses(transactionRepository.findAllByLoanIdAndUsername(id, userDetails.getUsername()));
    }

    public Page<TransactionResponse> findAllTransactionsByUsername(UserDetails userDetails, Pageable pageable) {
        Page<Transaction> transactionsPage = transactionRepository.findAllByUsername(userDetails.getUsername(), pageable);
        List<TransactionResponse> transactionResponses = transactionMapper.toTransactionResponses(transactionsPage.getContent());
        return new PageImpl<>(transactionResponses, pageable, transactionsPage.getTotalElements());
    }

    public TransactionResponse findTransactionByUsernameAndId(UserDetails userDetails, long id) {
        return transactionMapper.toTransactionResponse(transactionRepository.findByUsernameAndId(userDetails.getUsername(), id));
    }

    public List<AmountSumWithMonth> getSumOfLastSixMonthsIncomeOrExpense(UserDetails userDetails, TransactionType transactionType) {
        List<AmountSumWithMonth> incomesSumWithMonths = new ArrayList<>();
        LocalDate today = LocalDate.now();

        for (int i = 0; i < 6; i++) {
            AmountSumWithMonth amountSumWithMonth = new AmountSumWithMonth();

            LocalDate startDate = today.minusMonths(i).withDayOfMonth(1);
            LocalDate endDate = today.minusMonths(i).withDayOfMonth(today.minusMonths(i).lengthOfMonth());

            Date start = Date.valueOf(startDate);
            Date end = Date.valueOf(endDate);


            Double sum = transactionRepository.findTransactionsByTransactionTypeAndDate(transactionType, start, end, userDetails.getUsername());

            amountSumWithMonth.setAmount(sum != null ? sum : 0.0);
            amountSumWithMonth.setMonth(today.minusMonths(i).getMonth().toString());

            incomesSumWithMonths.add(amountSumWithMonth);
        }

        return incomesSumWithMonths;
    }

    @Transactional
    public void deleteUserTransaction(UserDetails userDetails, long id) {
        transactionRepository.deleteByUsernameAndId(userDetails.getUsername(), id);
    }

    @Transactional
    public void deleteTransactionByPlannedExpense(UserDetails userDetails, PlannedExpense plannedExpense) {
        transactionRepository.deleteByUsernameAndPlannedExpense(userDetails.getUsername(), plannedExpense);
    }

    @Transactional
    public void deleteTransactionBySingleExpense(UserDetails userDetails, SingleExpense singleExpense) {
        transactionRepository.deleteByUsernameAndSingleExpense(userDetails.getUsername(), singleExpense);
    }

    @Transactional
    public void deleteTransactionByIncome(UserDetails userDetails, Income income) {
        transactionRepository.deleteByUsernameAndIncome(userDetails.getUsername(), income);
    }
    @Transactional
    public void deleteTransactionBySavingGoal(UserDetails userDetails, SavingGoal savingGoal){
        transactionRepository.deleteByUsernameAndSavingsGoal(userDetails.getUsername(), savingGoal);
    }

    public void updateUserTransaction(UserDetails userDetails, long id, TransactionRequest transactionRequest) {
        Transaction transaction = transactionMapper.toTransaction(transactionRequest);
        transaction.setId(id);
        transaction.setUsername(userDetails.getUsername());
        transactionRepository.save(transaction);
    }

    @Transactional
    public void addIncomeTransaction(Income income) {
        Transaction transaction = Transaction.builder()
                .username(income.getUsername())
                .amount(income.getAmount())
                .transactionName("Income: " + income.getDescription())
                .transactionType(TransactionType.INCOME)
                .transactionCategory(TransactionCategory.valueOf(income.getTypeofIncome().toString()))
                .date(income.getIncomeDate())
                .income(income)
                .build();
        transactionRepository.save(transaction);
    }

    @Transactional
    public void addSingleExpenseTransaction(SingleExpense singleExpense) {
        Transaction transaction = Transaction.builder()
                .username(singleExpense.getUsername())
                .amount(singleExpense.getAmount())
                .transactionName("Single Expense: " + singleExpense.getDescription())
                .transactionType(TransactionType.EXPENSE)
                .transactionCategory(TransactionCategory.valueOf(singleExpense.getExpenseCategory().toString()))
                .date(singleExpense.getDate())
                .singleExpense(singleExpense)
                .build();
        transactionRepository.save(transaction);
    }

    @Transactional
    public void addRecurringExpenseTransaction(RecurringExpense recurringExpense) {
        Transaction transaction = Transaction.builder()
                .username(recurringExpense.getUsername())
                .amount(recurringExpense.getAmount())
                .transactionName("Recurring Expense: " + recurringExpense.getExpenseName())
                .transactionType(TransactionType.EXPENSE)
                .transactionCategory(TransactionCategory.valueOf(recurringExpense.getExpenseType().toString()))
                .date(recurringExpense.getDate())
                .recurringExpense(recurringExpense)
                .build();
        transactionRepository.save(transaction);
    }

    @Transactional
    public void addPlannedExpenseTransaction(PlannedExpense plannedExpense) {
        Transaction transaction = Transaction.builder()
                .username(plannedExpense.getUsername())
                .amount(plannedExpense.getAmount())
                .transactionName(plannedExpense.getName())
                .transactionType(TransactionType.EXPENSE)
                .transactionCategory(TransactionCategory.PLANNED_EXPENSE)
                .date(Date.valueOf(LocalDate.now()))
                .plannedExpense(plannedExpense)
                .build();
        transactionRepository.save(transaction);
    }

    @Transactional
    public void addLoanTransaction(Loan loan, double installmentAmount, java.util.Date date) {
        Transaction transaction = Transaction.builder()
                .username(loan.getUsername())
                .amount(installmentAmount)
                .transactionName(loan.getLoanName())
                .transactionType(TransactionType.EXPENSE)
                .transactionCategory(TransactionCategory.DEBT)
                .date(date)
                .loan(loan)
                .build();
        transactionRepository.save(transaction);
    }

    @Transactional
    public void addSavingGoalTransaction(SavingGoal savingGoal, TransactionType transactionType, Double amount) {
        Transaction transaction = Transaction.builder()
                .username(savingGoal.getUsername())
                .amount(amount)
                .transactionName("Savings: " + savingGoal.getSavingGoalName())
                .transactionType(transactionType)
                .transactionCategory(TransactionCategory.SAVINGS)
                .date(Date.valueOf(LocalDate.now()))
                .savingsGoal(savingGoal)
                .build();
        transactionRepository.save(transaction);
    }

    @Transactional
    public void updateSingleExpenseTransaction(SingleExpense singleExpense, UserDetails userDetails) {
        Transaction existingTransaction = transactionRepository.findByUsernameAndSingleExpense(userDetails.getUsername(), singleExpense);
        existingTransaction.setTransactionName("Single Expense: " + singleExpense.getDescription());
        existingTransaction.setAmount(singleExpense.getAmount());
        existingTransaction.setDate(singleExpense.getDate());
        existingTransaction.setTransactionCategory(TransactionCategory.valueOf(singleExpense.getExpenseCategory().toString()));

        transactionRepository.save(existingTransaction);
    }

    @Transactional
    public void updateIncomeTransaction(Income income, UserDetails userDetails) {
        Transaction existingTransaction = transactionRepository.findByUsernameAndIncome(userDetails.getUsername(), income);
        existingTransaction.setTransactionName("Income: " + income.getSourceOfIncome());
        existingTransaction.setAmount(income.getAmount());
        existingTransaction.setDate(income.getIncomeDate());
        existingTransaction.setTransactionCategory(TransactionCategory.valueOf(income.getTypeofIncome().toString()));

        transactionRepository.save(existingTransaction);
    }


}
