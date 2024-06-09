package pl.savings.wealthvoyage.transactions;

import jakarta.persistence.Column;
import lombok.*;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TransactionResponse {

    private Long id;
    private double amount;
    private String transactionName;
    private TransactionType transactionType;
    private TransactionCategory transactionCategory;
    private Date date;
}
