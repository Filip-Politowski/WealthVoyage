package pl.savings.wealthvoyage.plannedExpenses;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.savings.wealthvoyage.setOfPlannedExpenses.SetOfPlannedExpenses;
import pl.savings.wealthvoyage.setOfPlannedExpenses.SetOfPlannedExpensesRepository;
import pl.savings.wealthvoyage.setOfPlannedExpenses.SetOfPlannedExpensesService;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PlannedExpenseService {
    private final PlannedExpenseRepository plannedExpenseRepository;
    private final PlannedExpenseMapper plannedExpenseMapper;
    private final SetOfPlannedExpensesRepository setOfPlannedExpensesRepository;
    private final SetOfPlannedExpensesService setOfPlannedExpensesService;

    public Page<PlannedExpenseResponse> getAllPlannedExpensesByUsername(@NotNull UserDetails userDetails, Long setOfPlannedExpensesId, Pageable pageable) {
        Optional<SetOfPlannedExpenses> optionalSetOfPlannedExpenses = setOfPlannedExpensesRepository.findById(setOfPlannedExpensesId);
        SetOfPlannedExpenses setOfPlannedExpenses = new SetOfPlannedExpenses();
        if (optionalSetOfPlannedExpenses.isPresent()) {
            setOfPlannedExpenses = optionalSetOfPlannedExpenses.get();
        }
        Optional<Page<PlannedExpense>> plannedExpensesOptional = plannedExpenseRepository.findAllByUsernameAndSetOfPlannedExpenses(userDetails.getUsername(), setOfPlannedExpenses, pageable);

        if (plannedExpensesOptional.isEmpty()) {

            return new PageImpl<>(Collections.emptyList(), pageable, 0);
        }

        Page<PlannedExpense> plannedExpensesPage = plannedExpensesOptional.get();

        List<PlannedExpense> sortedExpenses = plannedExpensesPage.getContent().stream()
                .sorted((e1, e2) -> {

                    int statusComparison = e2.getStatus().compareTo(e1.getStatus());
                    if (statusComparison != 0) {
                        return statusComparison;
                    }

                    return Integer.compare(e2.getPriority(), e1.getPriority());
                })
                .collect(Collectors.toList());

        List<PlannedExpenseResponse> plannedExpenseResponses = plannedExpenseMapper.toPlannedExpenseResponseList(sortedExpenses);

        return new PageImpl<>(plannedExpenseResponses, pageable, plannedExpensesPage.getTotalElements());
    }


    public PlannedExpenseResponse getUserPlannedExpenseById(Long id, @NotNull UserDetails userDetails) {
        Optional<PlannedExpense> optionalPlannedExpense = plannedExpenseRepository.findByIdAndUsername(id, userDetails.getUsername());
        return optionalPlannedExpense.map(plannedExpenseMapper::toPlannedExpenseResponse).orElseThrow(NoSuchElementException::new);
    }

    @Transactional
    public void deleteUserPlannedExpenseById(Long id, @NotNull UserDetails userDetails) {
        PlannedExpense plannedExpense = new PlannedExpense();
        Optional<PlannedExpense> optionalPlannedExpense = plannedExpenseRepository.findById(id);
        if (optionalPlannedExpense.isPresent()) {
            plannedExpense = optionalPlannedExpense.get();
        }
        setOfPlannedExpensesService.updateAmountWhileDeletingPlannedExpense(plannedExpense);
        plannedExpenseRepository.deleteByIdAndUsername(id, userDetails.getUsername());

    }

    public PlannedExpense saveUserPlannedExpense(PlannedExpenseRequest plannedExpenseRequest, Long setOfPlannedExpensesId, UserDetails userDetails) {
        PlannedExpense plannedExpense = plannedExpenseMapper.toPlannedExpense(plannedExpenseRequest);

        SetOfPlannedExpenses setOfPlannedExpenses = new SetOfPlannedExpenses();
        Optional<SetOfPlannedExpenses> optionalSetOfPlannedExpenses = setOfPlannedExpensesRepository.findById(setOfPlannedExpensesId);
        if (optionalSetOfPlannedExpenses.isPresent()) {
            setOfPlannedExpenses = optionalSetOfPlannedExpenses.get();
        }

        plannedExpense.setSetOfPlannedExpenses(setOfPlannedExpenses);
        plannedExpense.setUsername(userDetails.getUsername());

        plannedExpenseRepository.save(plannedExpense);

        setOfPlannedExpensesService.updateAmount(plannedExpense.getSetOfPlannedExpenses().getId());
        return plannedExpense;
    }

    public void updateUserPlannedExpense(Long id, PlannedExpenseRequest plannedExpenseRequest, Long setOfPlannedExpensesId,  UserDetails userDetails) {
        SetOfPlannedExpenses setOfPlannedExpenses = new SetOfPlannedExpenses();
        Optional<SetOfPlannedExpenses> optionalSetOfPlannedExpenses = setOfPlannedExpensesRepository.findById(setOfPlannedExpensesId);
        if (optionalSetOfPlannedExpenses.isPresent()) {
            setOfPlannedExpenses = optionalSetOfPlannedExpenses.get();
        }

        PlannedExpense plannedExpense = plannedExpenseMapper.toPlannedExpense(plannedExpenseRequest);
        plannedExpense.setUsername(userDetails.getUsername());
        plannedExpense.setId(id);
        plannedExpense.setSetOfPlannedExpenses(setOfPlannedExpenses);

        plannedExpenseRepository.save(plannedExpense);

        setOfPlannedExpensesService.updateAmount(plannedExpense.getSetOfPlannedExpenses().getId());

    }

    public PlannedExpenseResponse updateUserPlannedExpenseStatus(UserDetails userDetails, Long id, Status status) {
        Optional<PlannedExpense> optionalPlannedExpense = plannedExpenseRepository.findByIdAndUsername(id, userDetails.getUsername());
        if (optionalPlannedExpense.isPresent()) {
            PlannedExpense plannedExpense = optionalPlannedExpense.get();
            plannedExpense.setStatus(status);
            setOfPlannedExpensesService.updateAmount(plannedExpense.getSetOfPlannedExpenses().getId());
            return plannedExpenseMapper.toPlannedExpenseResponse(plannedExpenseRepository.save(plannedExpense));
        } else {
            throw new IllegalArgumentException("PlannedExpense not found");
        }
    }
}
