package pl.savings.wealthvoyage.transactions;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "transaction")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    private String username;
    private String entityRelationshipNumber;
    @Column(name = "amount")
    private double amount;

    @Column(name = "transaction_type")
    private TransactionType transactionType;

    @Column(name = "category")
    private String category;

    @Column(name = "date")
    private String date;


}
