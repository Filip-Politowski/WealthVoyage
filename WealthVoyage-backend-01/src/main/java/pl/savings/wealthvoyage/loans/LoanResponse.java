package pl.savings.wealthvoyage.loans;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoanResponse {
    private Long id;
    private String loanName;
    private Integer numberOfInstallments;
    private Integer numberOfPaidInstallments;
    private Double totalAmountOfLoan;
    private String startDateOfInstallment;
    private String endDateOFInstallment;
    private LoanStatus loanStatus;
    private Double amountOfSingleInstallment;


}
