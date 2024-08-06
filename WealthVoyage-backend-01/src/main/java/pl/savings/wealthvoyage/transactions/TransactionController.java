package pl.savings.wealthvoyage.transactions;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
    public List<TransactionResponse> getAllTransactionsByLoan(@AuthenticationPrincipal UserDetails userDetails ,@PathVariable Long id) {
        return transactionService.findAllTransactionsByLoanId(id, userDetails);
    }
    @GetMapping("/all")
    public Page<TransactionResponse> getAllUserTransactions(@AuthenticationPrincipal UserDetails userDetails, Pageable pageable){
        return transactionService.findAllTransactionsByUsername(userDetails, pageable);
    }
    @GetMapping("/{id}")
    public TransactionResponse getUserSingleTransaction (@AuthenticationPrincipal UserDetails userDetails, @PathVariable long id){
        return transactionService.findTransactionByUsernameAndId(userDetails, id);
    }

    @DeleteMapping("/{id}")
    public void deleteUserTransaction(@AuthenticationPrincipal UserDetails userDetails, @PathVariable long id){
        transactionService.deleteUserTransaction(userDetails, id);
    }
    @PutMapping("/update/{id}")
    public void updateUserTransaction(@AuthenticationPrincipal UserDetails userDetails, @PathVariable long id, @RequestBody TransactionRequest transactionRequest){
        transactionService.updateUserTransaction(userDetails, id, transactionRequest);
    }

}
