package pl.savings.wealthvoyage.loans;

import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class LoanService {
    private final LoanRepository loanRepository;
    private final LoanMapper loanMapper;
    public LoanResponse getUserLoanById (Long id, @NotNull UserDetails userDetails) {
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
}
