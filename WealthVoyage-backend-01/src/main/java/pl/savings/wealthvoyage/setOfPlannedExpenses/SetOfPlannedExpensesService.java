package pl.savings.wealthvoyage.setOfPlannedExpenses;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.config.ConfigDataResourceNotFoundException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;
import pl.savings.wealthvoyage.plannedExpenses.PlannedExpense;
import pl.savings.wealthvoyage.plannedExpenses.Status;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class SetOfPlannedExpensesService {
    private final SetOfPlannedExpensesRepository setOfPlannedExpensesRepository;
    private final SetOfPlannedExpensesMapper setOfPlannedExpensesMapper;


    public SetOfPlannedExpensesResponse getUserSetOfPlannedExpenses(UserDetails userDetails, Long id) {
        return setOfPlannedExpensesMapper.toSetOfPlannedExpensesResponse(setOfPlannedExpensesRepository.findByUsernameAndId(userDetails.getUsername(), id));
    }

    public List<SetOfPlannedExpensesResponse> getAllUserSetOfPlannedExpenses(UserDetails userDetails) {
        return setOfPlannedExpensesMapper.toSetOfPlannedExpensesResponseList(
                setOfPlannedExpensesRepository.findAllByUsername(userDetails.getUsername())
        );
    }

    public void addUserSetOfPlannedExpenses(UserDetails userDetails, @RequestBody SetOfPlannedExpensesRequest setOfPlannedExpensesRequest) {
        SetOfPlannedExpenses setOfPlannedExpenses = setOfPlannedExpensesMapper.toSetOfPlannedExpenses(setOfPlannedExpensesRequest);
        setOfPlannedExpenses.setUsername(userDetails.getUsername());
        setOfPlannedExpensesRepository.save(setOfPlannedExpenses);
    }

    public void updateUserSetOfPlannedExpenses(UserDetails userDetails, @RequestBody SetOfPlannedExpensesRequest setOfPlannedExpensesRequest, Long id) {
        SetOfPlannedExpenses existingSetOfPlannedExpenses = setOfPlannedExpensesRepository.findByUsernameAndId(userDetails.getUsername(), id);
        if (existingSetOfPlannedExpenses == null) {
            throw new EntityNotFoundException("Set of planned expenses not found for user " + userDetails.getUsername() + " with id " + id);
        }
        SetOfPlannedExpenses setOfPlannedExpenses = setOfPlannedExpensesMapper.toSetOfPlannedExpenses(setOfPlannedExpensesRequest);
        setOfPlannedExpenses.setUsername(userDetails.getUsername());
        setOfPlannedExpenses.setId(id);
        setOfPlannedExpensesRepository.save(setOfPlannedExpenses);
    }

    @Transactional
    public void deleteUserSetOfPlannedExpenses(Long id, UserDetails userDetails) {
        setOfPlannedExpensesRepository.deleteByIdAndUsername(id, userDetails.getUsername());
    }


    @Transactional
    public void updateAmount(Long id) {
        SetOfPlannedExpenses setOfPlannedExpenses = setOfPlannedExpensesRepository.findById(id).orElseThrow(
                () -> new NoSuchElementException("Set not found"));
        double totalAmount = setOfPlannedExpenses.getPlannedExpenses().stream()
                .filter(pe -> pe.getStatus() == Status.PAYABLE)
                .mapToDouble(PlannedExpense::getAmount)
                .sum();
        setOfPlannedExpenses.setAmount(totalAmount);
        setOfPlannedExpensesRepository.save(setOfPlannedExpenses);
    }

    @Transactional
    public void updateAmountWhileDeletingPlannedExpense(PlannedExpense plannedExpense) {
        SetOfPlannedExpenses setOfPlannedExpenses = setOfPlannedExpensesRepository.findById(plannedExpense.getSetOfPlannedExpenses().getId()).orElseThrow(
                () -> new NoSuchElementException("Set not found"));
        double totalAmount = setOfPlannedExpenses.getAmount();
        if (plannedExpense.getStatus().equals(Status.PAYABLE)) {
            totalAmount = setOfPlannedExpenses.getAmount() - plannedExpense.getAmount();
        }
        setOfPlannedExpenses.setAmount(totalAmount);
        setOfPlannedExpensesRepository.save(setOfPlannedExpenses);

    }

}
