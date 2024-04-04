package pl.savings.wealthvoyage.loans;

import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;

@Component
public class LoanMapper {
    public Loan toLoan(LoanRequest request) {
        if (request == null) {
            throw new NullPointerException("LoanRequest cannot be null");
        }
        return Loan.builder()
                .id(request.getId())
                .loanName(request.getLoanName())
                .numberOfInstallments(request.getNumberOfInstallments())
                .numberOfPaidInstallments(request.getNumberOfPaidInstallments())
                .totalAmountOfLoan(request.getTotalAmountOfLoan())
                .startDateOfInstallment(request.getStartDataOfInstallment())
                .endDateOfInstallment(request.getEndDateOFInstallment())
                .loanStatus(request.getLoanStatus())
                .build();
    }

    public LoanResponse toLoanResponse(Loan loan) {
        if (loan == null) {
            throw new NullPointerException("Loan cannot be null");
        }
        return LoanResponse.builder()
                .id(loan.getId())
                .loanName(loan.getLoanName())
                .numberOfInstallments(loan.getNumberOfInstallments())
                .numberOfPaidInstallments(loan.getNumberOfPaidInstallments())
                .totalAmountOfLoan(loan.getTotalAmountOfLoan())
                .startDataOfInstallment(loan.getStartDateOfInstallment())
                .endDateOFInstallment(loan.getEndDateOfInstallment())
                .loanStatus(loan.getLoanStatus())
                .build();
    }

    public List<LoanResponse> toLoanResponses(List<Loan> loans) {
        if (loans == null) {
            throw new NullPointerException("Loans cannot be empty");
        }
        return loans.stream().map(this::toLoanResponse).toList();
    }
}
