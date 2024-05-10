package pl.savings.wealthvoyage.transactions;

import lombok.RequiredArgsConstructor;


import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.savings.wealthvoyage.loans.Loan;

import java.util.List;
import java.util.NoSuchElementException;

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


    public List<TransactionResponse> findAllTransactionsByUsername(UserDetails userDetails) {
        return transactionMapper.toTransactionResponses(transactionRepository.findAllByUsername(userDetails.getUsername()));
    }

    public TransactionResponse findTransactionByUsernameAndId(UserDetails userDetails, long id) {
        return transactionMapper.toTransactionResponse(transactionRepository.findByUsernameAndId(userDetails.getUsername(), id));
    }

    @Transactional
    public void deleteUserTransaction(UserDetails userDetails, long id) {
        transactionRepository.deleteByUsernameAndId(userDetails.getUsername(), id);
    }
}
