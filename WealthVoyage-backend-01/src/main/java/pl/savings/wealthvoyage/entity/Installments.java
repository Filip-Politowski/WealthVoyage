package pl.savings.wealthvoyage.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "installments")
public class Installments {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column (name = "user_email")
    private String userEmail;

    @Column (name = "installment_amount")
    private Double installmentAmount;

    @Column (name = "number_of_installments")
    private Integer numberOfInstallments;

    @Column ( name = "start_date_of_installment")
    private String startDateOfInstallment;

    @Column ( name = "end_date_of_installment")
    private String endDateOfInstallment;
}
