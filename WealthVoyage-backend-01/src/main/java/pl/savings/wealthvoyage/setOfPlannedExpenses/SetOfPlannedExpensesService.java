package pl.savings.wealthvoyage.setOfPlannedExpenses;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SetOfPlannedExpensesService {
    private final SetOfPlannedExpensesRepository setOfPlannedExpensesRepository;
    private final SetOfPlannedExpensesMapper setOfPlannedExpensesMapper;


    public SetOfPlannedExpensesResponse getUserSetOfPlannedExpenses(UserDetails userDetails, Long id) {
        return setOfPlannedExpensesMapper.toSetOfPlannedExpensesResponse(setOfPlannedExpensesRepository.findByUsernameAndId(userDetails.getUsername(), id));
    }

    public List<SetOfPlannedExpensesResponse> getAllUserSetOfPlannedExpenses(UserDetails userDetails) {
        List<SetOfPlannedExpenses> setOfPlannedExpenses = setOfPlannedExpensesRepository.findAllByUsername(userDetails.getUsername());
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

}
