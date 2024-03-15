package pl.savings.wealthvoyage.loans;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "installments")
public class Loan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "loan_name")
    private String loanName;

    @Column(name = "number_of_installments")
    private Integer numberOfInstallments;

    @Column(name = "number_of_paid_installments")
    private int numberOfPaidInstallments;

    @Column(name = "total_amount_of_loan")
    private Double totalAmountOfLoan;

    @Column(name = "start_date_of_installment")
    private String startDateOfInstallment;

    @Column(name = "end_date_of_installment")
    private String endDateOfInstallment;
}
