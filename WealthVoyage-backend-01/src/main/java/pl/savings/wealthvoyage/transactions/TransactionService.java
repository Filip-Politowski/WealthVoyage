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
import pl.savings.wealthvoyage.singleExpense.SingleExpense;


import java.sql.Date;
import java.time.LocalDate;
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

    @Transactional
    public void deleteUserTransaction(UserDetails userDetails, long id) {
        transactionRepository.deleteByUsernameAndId(userDetails.getUsername(), id);
    }

    @Transactional
    public void deleteTransactionByPlannedExpense(UserDetails userDetails, PlannedExpense plannedExpense) {
        transactionRepository.deleteByUsernameAndPlannedExpense(userDetails.getUsername(), plannedExpense);
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
                .transactionName("Income: " + income.getSourceOfIncome())
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
}
