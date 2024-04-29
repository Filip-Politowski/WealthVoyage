package pl.savings.wealthvoyage.transactions;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/transactions")
public class TransactionController {
    private final TransactionService transactionService;

    @GetMapping("/all")
    public List<TransactionResponse> getAllTransactionsByRelationshipNumber(@AuthenticationPrincipal UserDetails userDetails, @RequestBody TransactionRequest transactionRequest) {
        return transactionService.getUserTransactionsByRelationNumber(userDetails, transactionRequest.getEntityRelationshipNumber());
    }
}
