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

    @GetMapping("/loan/all/{id}")
    public List<TransactionResponse> getAllTransactionsByRelationshipNumber(@AuthenticationPrincipal UserDetails userDetails ,@PathVariable Long id) {
        return transactionService.findAllTransactionsByLoanId(id, userDetails);
    }
}