package pl.savings.wealthvoyage.income;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.time.temporal.Temporal;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface IncomeRepository extends JpaRepository<Income, Long> {
    Optional<Income> findByIdAndUsername(Long id, String username);

    Optional<Page<Income>> findAllByUsernameAndIncomeStatus(String username, IncomeStatus incomeStatus, Pageable pageable);
    @Query("SELECT i FROM Income i WHERE i.username = :username AND i.incomeDate >= :startDate AND i.incomeDate < :endDate AND i.incomeStatus = :incomeStatus AND i.typeofIncome = :typeOfIncome")
    Page<Income> findIncomesByUsernameAndMonthAndStatusAndType(
            @Param("username") String username,
            @Param("startDate") Date startDate,
            @Param("endDate") Date endDate,
            @Param("incomeStatus") IncomeStatus incomeStatus,
            @Param("typeOfIncome") TypeOfIncome typeOfIncome,
            Pageable pageable
    );

    @Query("SELECT i FROM Income  i WHERE (i.typeofIncome = 'FIXED_INCOME' OR i.typeofIncome = 'SUPPLEMENTARY_INCOME') AND i.incomeStatus = 'ACTIVE'")
    List<Income> findAllIncomesWhereTypeIsFixedOrSupplementaryAndStatusActive();




    @Query("SELECT i FROM Income i WHERE i.username = :username AND i.incomeDate >= :startDate AND i.incomeDate <= :endDate AND i.incomeStatus = :incomeStatus AND i.typeofIncome = :typeOfIncome")
    Page<Income> findIncomesByUsernameAndDateRangeAndStatusAndType(
            @Param("username") String username,
            @Param("startDate") Date startDate,
            @Param("endDate") Date endDate,
            @Param("incomeStatus") IncomeStatus incomeStatus,
            @Param("typeOfIncome") TypeOfIncome typeOfIncome,
            Pageable pageable
    );

    void deleteByIdAndUsername(Long id, String username);

    @Query("SELECT SUM(i.amount) FROM Income i WHERE i.username = :username AND i.typeofIncome = 'FIXED_INCOME'  AND i.incomeStatus ='ACTIVE' ")
    Optional<Double> findTotalFixedIncomeByUsername(@Param("username") String username);

    @Query("SELECT SUM(i.amount) FROM Income i WHERE i.username = :username AND i.typeofIncome = 'SUPPLEMENTARY_INCOME' AND i.incomeStatus ='ACTIVE'")
    Optional<Double> findTotalSupplementaryIncomeByUsername(@Param("username") String username);

    @Query("SELECT SUM(e.amount) FROM Income e" +
            " WHERE e.incomeDate BETWEEN :startDate AND :endDate" +
            " AND e.username = :username AND e.incomeStatus = 'ACTIVE' AND e.typeofIncome = :typeOfIncome")
    Double sumAmountByDateBetweenAndUsername(
            @Param("startDate") Date startDate,
            @Param("endDate") Date endDate,
            @Param("username") String username,
            @Param("typeOfIncome") TypeOfIncome typeOfIncome
    );


}


