package pl.savings.wealthvoyage.transactions;

import org.springframework.stereotype.Component;
import pl.savings.wealthvoyage.loans.Loan;
import pl.savings.wealthvoyage.loans.LoanRequest;
import pl.savings.wealthvoyage.loans.LoanResponse;

import java.util.List;

@Component
public class TransactionMapper {
    public Transaction toTransaction(TransactionRequest request) {
        if (request == null) {
            throw new NullPointerException("Transaction cannot be null");
        }
        return Transaction.builder()
                .transactionType(request.getTransactionType())
                .amount(request.getAmount())
                .category(request.getCategory())
                .username(request.getUsername())
                .date(request.getDate())
                .entityRelationshipNumber(request.getEntityRelationshipNumber())
                .id(request.getId())
                .build();
    }

    public TransactionResponse toTransactionResponse(Transaction transaction) {
        if (transaction == null) {
            throw new NullPointerException("Transaction cannot be null");
        }
        return TransactionResponse.builder()
                .transactionType(transaction.getTransactionType())
                .amount(transaction.getAmount())
                .category(transaction.getCategory())
                .date(transaction.getDate())
                .username(transaction.getUsername())

                .build();
    }

    public List<TransactionResponse> toTransactionResponses(List<Transaction> transactions) {
        if (transactions == null) {
            throw new NullPointerException("Transactions cannot be empty");
        }
        return transactions.stream().map(this::toTransactionResponse).toList();
    }
}
