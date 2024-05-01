package pl.savings.wealthvoyage.paymentDates;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentDateRepository extends JpaRepository<PaymentDate, Long> {
}
