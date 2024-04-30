package pl.savings.wealthvoyage.loans;

import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.savings.wealthvoyage.income.Income;
import pl.savings.wealthvoyage.transactions.Transaction;
import pl.savings.wealthvoyage.transactions.TransactionRepository;
import pl.savings.wealthvoyage.transactions.TransactionService;
import pl.savings.wealthvoyage.transactions.TransactionType;

import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LoanService {
    private final LoanRepository loanRepository;
    private final TransactionService transactionService;
    private final LoanMapper loanMapper;

    public LoanResponse getUserLoanById(Long id, @NotNull UserDetails userDetails) {
        return loanMapper.toLoanResponse(loanRepository.findByIdAndUsername(id, userDetails.getUsername()).orElseThrow(NoSuchElementException::new));
    }

    public List<LoanResponse> getUserLoans(@NotNull UserDetails userDetails) {
        return loanMapper.toLoanResponses(loanRepository.findAllByUsername(userDetails.getUsername()).orElseThrow(NoSuchElementException::new));
    }

    public Loan saveUserLoan(LoanRequest loanRequest, @NotNull UserDetails userDetails) {
        Loan loan = loanMapper.toLoan(loanRequest);
        loan.setUsername(userDetails.getUsername());
        return loanRepository.save(loan);
    }

    @Transactional
    public void deleteUserLoanById(Long id, @NotNull UserDetails userDetails) {
        loanRepository.deleteByIdAndUsername(id, userDetails.getUsername());
    }

    public void updateUserLoan(Long id, LoanRequest loanRequest, @NotNull UserDetails userDetails) {
        Loan loan = loanMapper.toLoan(loanRequest);
        loan.setUsername(userDetails.getUsername());
        loan.setId(id);
        loanRepository.save(loan);
    }

    public Integer getUserLoansCount(@NotNull UserDetails userDetails) {
        return loanRepository.findAllByUsername(userDetails.getUsername()).orElseThrow(NoSuchElementException::new).size();
    }

    public void payOneUserInstalment(@NotNull UserDetails userDetails, Long id) {
        Optional<Loan> optionalLoan = loanRepository.findByIdAndUsername(id, userDetails.getUsername());
        Transaction transaction = new Transaction();
        double instalmentAmount = 0.0;

        if (optionalLoan.isPresent()) {
            Loan loan = optionalLoan.get();
            instalmentAmount = loan.getTotalAmountOfLoan() / loan.getNumberOfInstallments();

            loan.setNumberOfPaidInstallments(loan.getNumberOfPaidInstallments() + 1);
            transaction.setTransactionType(TransactionType.EXPENSE);
            transaction.setLoan(loan);
            transaction.setDate(new Date().toString());
            transaction.setAmount(instalmentAmount);
            transaction.setCategory("Loan");
            transaction.setUsername(userDetails.getUsername());

            transactionService.addTransaction(transaction);
            loanRepository.save(loan);
        } else {
            throw new NoSuchElementException("Nie znaleziono pożyczki dla określonego identyfikatora i użytkownika.");
        }
    }


}
