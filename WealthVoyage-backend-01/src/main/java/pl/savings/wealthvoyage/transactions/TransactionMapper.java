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
                .transactionCategory(request.getTransactionCategory())
                .username(request.getUsername())
                .date(request.getDate())
                .id(request.getId())
                .transactionName(request.getTransactionName())
                .build();
    }

    public TransactionResponse toTransactionResponse(Transaction transaction) {
        if (transaction == null) {
            throw new NullPointerException("Transaction cannot be null");
        }
        return TransactionResponse.builder()
                .id(transaction.getId())
                .transactionType(transaction.getTransactionType())
                .amount(transaction.getAmount())
                .transactionCategory(transaction.getTransactionCategory())
                .date(transaction.getDate())
                .transactionName(transaction.getTransactionName())
                .build();
    }

    public List<TransactionResponse> toTransactionResponses(List<Transaction> transactions) {
        if (transactions == null) {
            throw new NullPointerException("Transactions cannot be empty");
        }
        return transactions.stream().map(this::toTransactionResponse).toList();
    }
}
