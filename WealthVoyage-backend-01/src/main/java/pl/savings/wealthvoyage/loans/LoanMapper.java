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
                .startDateOfInstallment(request.getStartDateOfInstallment())
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
                .startDateOfInstallment(loan.getStartDateOfInstallment())
                .endDateOFInstallment(loan.getEndDateOfInstallment())
                .loanStatus(loan.getLoanStatus())
                .amountOfSingleInstallment(loan.getTotalAmountOfLoan() / loan.getNumberOfInstallments())
                .entityRelationshipNumber(loan.getEntityRelationshipNumber())
                .build();
    }

    public List<LoanResponse> toLoanResponses(List<Loan> loans) {
        if (loans == null) {
            throw new NullPointerException("Loans cannot be empty");
        }
        return loans.stream().map(this::toLoanResponse).toList();
    }
}
