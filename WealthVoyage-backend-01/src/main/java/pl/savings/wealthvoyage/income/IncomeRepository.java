package pl.savings.wealthvoyage.income;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IncomeRepository extends JpaRepository<Income, Integer> {
    Optional<Income> findByIdAndUsername(Integer id, String username);

    Optional<List<Income>> findAllByUsername(String username);

    void deleteByIdAndUsername(Integer id, String username);
}
