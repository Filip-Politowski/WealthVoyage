package pl.savings.wealthvoyage.paymentDates;

import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.Nullable;
import org.springframework.stereotype.Service;
import pl.savings.wealthvoyage.loans.Loan;
import pl.savings.wealthvoyage.loans.LoanMapper;
import pl.savings.wealthvoyage.loans.LoanRequest;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


@Service
@RequiredArgsConstructor
public class PaymentDateService {
    private final PaymentDateRepository paymentDateRepository;
    private final LoanMapper loanMapper;

    public void generatePaymentDatesForLoan(Loan loan) {

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

    public String getNearestPaymentDate(LoanRequest loanRequest) {
        Loan loan = loanMapper.toLoan(loanRequest);

        List<PaymentDate> paymentDateList = paymentDateRepository.findAllByLoan(loan);
        LocalDate currentDate = LocalDate.now();
        LocalDate nearestPaymentDate = getLocalDate(paymentDateList, currentDate);
        if (nearestPaymentDate != null) {
            return nearestPaymentDate.toString();
        } else {
            return "Brak płatności w bieżącym miesiącu";
        }
    }

    @Nullable
    private static LocalDate getLocalDate(List<PaymentDate> paymentDateList, LocalDate currentDate) {
        LocalDate nearestPaymentDate = null;

        for (PaymentDate paymentDate : paymentDateList) {
            LocalDate date = paymentDate.getPaymentDate();
            if (date.getYear() == currentDate.getYear() && date.getMonth() == currentDate.getMonth()) {

                if (nearestPaymentDate == null || date.isBefore(nearestPaymentDate)) {
                    nearestPaymentDate = date;
                }
            }
        }
        return nearestPaymentDate;
    }


}
