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
    public List<TransactionResponse> getAllTransactionsByLoan(@AuthenticationPrincipal UserDetails userDetails ,@PathVariable Long id) {
        return transactionService.findAllTransactionsByLoanId(id, userDetails);
    }
    @GetMapping("/all")
    public List<TransactionResponse> getAllUserTransactions(@AuthenticationPrincipal UserDetails userDetails){
        return transactionService.findAllTransactionsByUsername(userDetails);
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
    @PostMapping("/add")
    public void addTransaction (@AuthenticationPrincipal UserDetails userDetails, @RequestBody TransactionRequest transactionRequest){
        transactionService.addTransactionFromRequest(userDetails, transactionRequest);
    }
}
