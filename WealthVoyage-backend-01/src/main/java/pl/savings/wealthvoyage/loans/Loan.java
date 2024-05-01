package pl.savings.wealthvoyage.loans;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.savings.wealthvoyage.transactions.Transaction;

import java.util.List;
import java.util.Set;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "loan")
public class Loan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;

    private String loanName;



    @Column(name = "number_of_installments")
    private Integer numberOfInstallments;

    @Column(name = "number_of_paid_installments")
    private Integer numberOfPaidInstallments;

    @Column(name = "total_amount_of_loan")
    private Double totalAmountOfLoan;


    @Column(name = "start_date_of_installment")
    private String startDateOfInstallment;

    @Column(name = "end_date_of_installment")
    private String endDateOfInstallment;

    @Enumerated(EnumType.STRING)
    private LoanStatus loanStatus;

    @OneToMany(mappedBy = "loan")
    private List<Transaction> transactions;
}
