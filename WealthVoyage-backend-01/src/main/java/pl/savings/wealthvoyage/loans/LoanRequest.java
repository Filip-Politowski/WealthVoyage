package pl.savings.wealthvoyage.loans;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoanRequest {
    private Long id;
    private String loanName;
    private Integer numberOfInstallments;
    private Integer numberOfPaidInstallments;
    private Double totalAmountOfLoan;
    private String startDataOfInstallment;
    private String endDateOFInstallment;
    private LoanStatus loanStatus;
}
