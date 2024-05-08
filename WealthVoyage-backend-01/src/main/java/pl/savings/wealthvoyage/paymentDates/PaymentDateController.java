package pl.savings.wealthvoyage.paymentDates;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.savings.wealthvoyage.loans.Loan;
import pl.savings.wealthvoyage.loans.LoanRequest;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = ("/api/paymentDate"))
public class PaymentDateController {
    private final PaymentDateService paymentDateService;

    @PostMapping("/getNearestPaymentDate")
    public String getNearestPaymentDate(@RequestBody LoanRequest loanRequest) {
        return paymentDateService.getNearestPaymentDate(loanRequest);
    }
}
