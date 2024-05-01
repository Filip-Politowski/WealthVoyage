package pl.savings.wealthvoyage.paymentDates;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.savings.wealthvoyage.loans.Loan;
import pl.savings.wealthvoyage.loans.LoanRequest;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = ("/api/paymentDate"))
public class PaymentDateController {
    private final PaymentDateService paymentDateService;

    @GetMapping("/getNearestPaymentDate")
    public String getNearestPaymentDate(@RequestBody LoanRequest loanRequest) {
        return paymentDateService.getNearestPaymentDate(loanRequest);
    }
}
