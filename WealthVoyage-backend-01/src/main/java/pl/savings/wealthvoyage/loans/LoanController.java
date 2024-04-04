package pl.savings.wealthvoyage.loans;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping(value = ("/api/loans"))
public class LoanController {
    private final LoanService loanService;

    @GetMapping(value = "/{id}")
    public LoanResponse getLoanById(@AuthenticationPrincipal UserDetails userDetails, @PathVariable Long id) {
        return loanService.getUserLoanById(id, userDetails);
    }

    @GetMapping(value = "/all")
    public List<LoanResponse> getAllLoans(@AuthenticationPrincipal UserDetails userDetails) {
        return loanService.getUserLoans(userDetails);
    }

    @GetMapping(value = "/count")
    public Integer getLoansCount(@AuthenticationPrincipal UserDetails userDetails) {
        return loanService.getUserLoansCount(userDetails);
    }

    @PostMapping(value = "/add")
    public Loan addLoan(@AuthenticationPrincipal UserDetails userDetails, @RequestBody LoanRequest loanRequest) {
        return loanService.saveUserLoan(loanRequest, userDetails);
    }

    @DeleteMapping(value = "/delete/{id}")
    public void deleteLoan(@AuthenticationPrincipal UserDetails userDetails, @PathVariable Long id) {
        loanService.deleteUserLoanById(id, userDetails);
    }

    @PutMapping(value = "/update/{id}")
    public void updateLoan(@AuthenticationPrincipal UserDetails userDetails, @PathVariable Long id, @RequestBody LoanRequest loanRequest) {
        loanService.updateUserLoan(id, loanRequest, userDetails);
    }

}
