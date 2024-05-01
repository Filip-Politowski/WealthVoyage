package pl.savings.wealthvoyage.paymentDates;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.savings.wealthvoyage.loans.Loan;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PaymentDateService {
    private final PaymentDateRepository paymentDateRepository;

    public void generatePaymentDatesForLoan(Loan loan){

        List<PaymentDate> paymentDates = new ArrayList<>();
        LocalDate nextPaymentDate = LocalDate.parse(loan.getStartDateOfInstallment());
        for (int i = 0; i < loan.getNumberOfInstallments(); i++) {
            PaymentDate paymentDate = new PaymentDate();
            paymentDate.setPaymentDate(nextPaymentDate);
            paymentDate.setLoan(loan);
            paymentDates.add(paymentDate);
            nextPaymentDate = nextPaymentDate.plusMonths(1);
        }
        paymentDateRepository.saveAll(paymentDates);
    }


}
