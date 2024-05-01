package pl.savings.wealthvoyage.paymentDates;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.savings.wealthvoyage.loans.Loan;

import java.util.List;
import java.util.Optional;

@Repository
public interface PaymentDateRepository extends JpaRepository<PaymentDate, Long> {

    List<PaymentDate> findAllByLoan(Loan loan);
}
