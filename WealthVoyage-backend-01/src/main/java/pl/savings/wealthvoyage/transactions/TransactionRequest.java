package pl.savings.wealthvoyage.transactions;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TransactionRequest {
    private Long id;
    private String username;
    private double amount;
    private String transactionName;
    private TransactionType transactionType;
    private TransactionCategory transactionCategory;
    private Date date;
}
