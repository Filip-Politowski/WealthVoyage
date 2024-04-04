package pl.savings.wealthvoyage.loans;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.savings.wealthvoyage.income.Income;

import java.util.List;
import java.util.Optional;
@Repository
public interface LoanRepository extends JpaRepository<Loan, Long> {
    Optional<Loan> findByIdAndUsername(Long id, String username);

    Optional<List<Loan>> findAllByUsername(String username);

    void deleteByIdAndUsername(Long id, String username);
}
