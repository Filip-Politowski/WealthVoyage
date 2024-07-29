package pl.savings.wealthvoyage.setOfPlannedExpenses;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SetOfPlannedExpensesRepository extends JpaRepository<SetOfPlannedExpenses, Long > {

     List<SetOfPlannedExpenses> findAllByUsername(String username);
     SetOfPlannedExpenses findByUsernameAndId(String username, Long id);
     void deleteByIdAndUsername(Long id, String username);
}
