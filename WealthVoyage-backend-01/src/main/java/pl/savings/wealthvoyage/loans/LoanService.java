package pl.savings.wealthvoyage.loans;

import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.savings.wealthvoyage.paymentDates.PaymentDateService;
import pl.savings.wealthvoyage.transactions.*;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LoanService {
    private final LoanRepository loanRepository;
    private final TransactionService transactionService;
    private final PaymentDateService paymentDateService;
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
        Integer monthsBetween = Math.toIntExact(ChronoUnit.MONTHS.between(LocalDate.parse(loan.getStartDateOfInstallment()), LocalDate.parse(loan.getEndDateOfInstallment())));
        loan.setNumberOfInstallments(monthsBetween);
        Loan loanInDB = loanRepository.save(loan);
        paymentDateService.generatePaymentDatesForLoan(loanInDB);
        return loanInDB;
    }

    @Transactional
    public void deleteUserLoanById(Long id, @NotNull UserDetails userDetails) {
        loanRepository.deleteByIdAndUsername(id, userDetails.getUsername());
    }

    public void updateUserLoan(Long id, LoanRequest loanRequest, @NotNull UserDetails userDetails) {
        Loan loan = loanMapper.toLoan(loanRequest);
        loan.setUsername(userDetails.getUsername());
        loan.setId(id);
        Integer monthsBetween = Math.toIntExact(ChronoUnit.MONTHS.between(LocalDate.parse(loan.getStartDateOfInstallment()), LocalDate.parse(loan.getEndDateOfInstallment())));
        loan.setNumberOfInstallments(monthsBetween);
        loanRepository.save(loan);
    }

    public Integer getUserLoansCount(@NotNull UserDetails userDetails) {
        return loanRepository.findAllByUsername(userDetails.getUsername()).orElseThrow(NoSuchElementException::new).size();
    }

    public Double getUserSumOfAllLoans(@NotNull UserDetails userDetails) {
        return loanRepository.findAllByUsername(userDetails.getUsername())
                .orElseThrow(NoSuchElementException::new)
                .stream()
                .mapToDouble(Loan::getTotalAmountOfLoan)
                .reduce(0.00, Double::sum);
    }


    public void payOneUserInstalment(@NotNull UserDetails userDetails, Long id) {
        Optional<Loan> optionalLoan = loanRepository.findByIdAndUsername(id, userDetails.getUsername());

        Transaction transaction = new Transaction();

        double instalmentAmount = 0.0;

        Date currentDate = new Date();

        if (optionalLoan.isPresent()) {
            Loan loan = optionalLoan.get();

            if (loan.getLoanStatus().equals(LoanStatus.ENDED)) {
                return;
            }
            if (loan.getLoanStatus().equals(LoanStatus.UNPAID)) {
                loan.setLoanStatus(LoanStatus.PAID_OFF);
            }

            instalmentAmount = loan.getTotalAmountOfLoan() / loan.getNumberOfInstallments();
            loan.setNumberOfPaidInstallments(loan.getNumberOfPaidInstallments() + 1);

            if (loan.getNumberOfPaidInstallments().equals(loan.getNumberOfInstallments())) {
                loan.setLoanStatus(LoanStatus.ENDED);
            }



            transactionService.addLoanTransaction(loan, instalmentAmount, currentDate);
            loanRepository.save(loan);
        } else {
            throw new NoSuchElementException("Nie znaleziono pożyczki dla określonego identyfikatora i użytkownika.");
        }
    }


    public void updateLoanStatus() {
        List<Loan> allLoans = loanRepository.findAll();

        for (Loan loan : allLoans) {
            LocalDate currentDate = LocalDate.now();
            LocalDate startDateOfInstallment = LocalDate.parse(loan.getStartDateOfInstallment());
            LoanStatus currentLoanStatus = loan.getLoanStatus();

            LocalDate targetDateForStatusChange = startDateOfInstallment.withYear(currentDate.getYear())
                    .withMonth(currentDate.getMonthValue())
                    .withDayOfMonth(startDateOfInstallment.getDayOfMonth());

            if (targetDateForStatusChange.isEqual(currentDate) && currentLoanStatus.equals(LoanStatus.PAID_OFF)) {
                loan.setLoanStatus(LoanStatus.UNPAID);
                loanRepository.save(loan);
            }
        }
    }

}
