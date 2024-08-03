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
import pl.savings.wealthvoyage.singleExpense.ExpenseCategory;
import pl.savings.wealthvoyage.singleExpense.SingleExpense;
import pl.savings.wealthvoyage.singleExpense.SingleExpenseRepository;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class TransactionService {
    private final TransactionRepository transactionRepository;
    private final TransactionMapper transactionMapper;
    private final IncomeRepository incomeRepository;
    private final SingleExpenseRepository singleExpenseRepository;

    public void addTransaction(Transaction transaction) {

        transactionRepository.save(transaction);
    }

    public void addTransactionFromRequest(UserDetails userDetails, TransactionRequest transactionRequest) {
        Transaction transaction = transactionMapper.toTransaction(transactionRequest);
        transaction.setUsername(userDetails.getUsername());
        transactionRepository.save(transaction);
        if (transaction.getTransactionType() == TransactionType.INCOME) {
            Income income = new Income();
            income.setUsername(transaction.getUsername());
            income.setIncomeDate(transaction.getDate());
            income.setAmount(transaction.getAmount());
            income.setIncomeStatus(IncomeStatus.ACTIVE);
            income.setTypeofIncome(TypeOfIncome.SINGLE_PAYMENT);
            income.setSourceOfIncome(SourceOfIncome.OTHER);
            income.setDescription(transaction.getTransactionName());
            incomeRepository.save(income);

        } else {
            SingleExpense singleExpense = new SingleExpense();
            singleExpense.setUsername(transaction.getUsername());
            singleExpense.setExpenseCategory(ExpenseCategory.valueOf(String.valueOf(transaction.getTransactionCategory())));
            singleExpense.setDescription(transaction.getTransactionName());
            singleExpense.setDate(transaction.getDate());
            singleExpense.setAmount(transaction.getAmount());
            singleExpenseRepository.save(singleExpense);
        }

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

    public void updateUserTransaction(UserDetails userDetails, long id, TransactionRequest transactionRequest) {
        Transaction transaction = transactionMapper.toTransaction(transactionRequest);
        transaction.setId(id);
        transaction.setUsername(userDetails.getUsername());
        transactionRepository.save(transaction);
    }
}
