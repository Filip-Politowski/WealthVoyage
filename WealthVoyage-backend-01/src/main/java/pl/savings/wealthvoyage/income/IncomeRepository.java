package pl.savings.wealthvoyage.income;


import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

@Repository
public interface IncomeRepository extends JpaRepository<Income, Long> {
    Optional<Income> findByIdAndUsername(Long id, String username);

    Optional<Page<Income>> findAllByUsernameAndIncomeStatus(String username,IncomeStatus incomeStatus, Pageable pageable);


    void deleteByIdAndUsername(Long id, String username);

    @Query("SELECT SUM(i.amount) FROM Income i WHERE i.username = :username AND i.typeofIncome = 'FIXED_INCOME'  AND i.incomeStatus ='ACTIVE' ")
    Optional<Double> findTotalFixedIncomeByUsername(@Param("username") String username);

    @Query("SELECT SUM(i.amount) FROM Income i WHERE i.username = :username AND i.typeofIncome = 'SUPPLEMENTARY_INCOME' AND i.incomeStatus ='ACTIVE'")
    Optional<Double> findTotalSupplementaryIncomeByUsername(@Param("username") String username);
}
