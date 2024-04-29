package pl.savings.wealthvoyage.transactions;

import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class TransactionService {
    private final TransactionRepository transactionRepository;
    private final TransactionMapper transactionMapper;

    public List<TransactionResponse> getUserTransactionsByRelationNumber(@NotNull UserDetails userDetails, String relationShipNumber) {
        return transactionMapper.toTransactionResponses(transactionRepository.findAllByEntityRelationshipNumberAndUsername(relationShipNumber, userDetails.getUsername()).orElseThrow(NoSuchElementException::new));
    }

    public Transaction addTransaction (@NotNull UserDetails userDetails, String relationShipNumber, TransactionType transactionType,String category, Double amount){
        return Transaction.builder()
                .date(new Date().toString())
                .transactionType(transactionType)
                .username(userDetails.getUsername())
                .entityRelationshipNumber(relationShipNumber)
                .category(category)
                .build();

    }

}
