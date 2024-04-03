package pl.savings.wealthvoyage.monthlyIncome;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MonthlyIncomeRepository extends JpaRepository<MonthlyIncome, Integer> {
    Optional<MonthlyIncome> findByIdAndUsername(Integer id, String username);

    Optional<List<MonthlyIncome>> findAllByUsername(String username);

    void deleteByIdAndUsername(Integer id, String username);
}
