package pl.savings.wealthvoyage.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.savings.wealthvoyage.entity.Installments;

public interface InstallmentsRepository extends JpaRepository<Installments, Long> {
}
