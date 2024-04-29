package pl.savings.wealthvoyage.transactions;

import jakarta.persistence.Column;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TransactionResponse {

    private String username;
    private double amount;
    private TransactionType transactionType;
    private String category;
    private String date;
}
