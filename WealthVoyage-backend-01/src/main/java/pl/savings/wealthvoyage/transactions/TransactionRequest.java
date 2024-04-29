package pl.savings.wealthvoyage.transactions;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TransactionRequest {
    private Long id;
    private String username;
    private String entityRelationshipNumber;
    private double amount;
    private TransactionType transactionType;
    private String category;
    private String date;
}
