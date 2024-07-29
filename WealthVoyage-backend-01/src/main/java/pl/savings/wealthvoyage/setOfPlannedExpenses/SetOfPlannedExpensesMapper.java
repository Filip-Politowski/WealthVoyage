package pl.savings.wealthvoyage.setOfPlannedExpenses;

import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class SetOfPlannedExpensesMapper {
    public SetOfPlannedExpenses toSetOfPlannedExpenses(SetOfPlannedExpensesRequest request) {
        if (request == null) {
            throw new NullPointerException("Request cannot be null");
        }
        return SetOfPlannedExpenses.builder()
                .id(request.getId())
                .amount(request.getAmount())
                .name(request.getName())
                .build();

    }

    public SetOfPlannedExpensesResponse toSetOfPlannedExpensesResponse(SetOfPlannedExpenses setOfPlannedExpenses) {
        if (setOfPlannedExpenses == null) {
            throw new NullPointerException("set of planned expenses cannot be null");
        }
        return SetOfPlannedExpensesResponse.builder()
                .id(setOfPlannedExpenses.getId())
                .amount(setOfPlannedExpenses.getAmount())
                .name(setOfPlannedExpenses.getName())
                .build();
    }

    public List<SetOfPlannedExpensesResponse> toSetOfPlannedExpensesResponseList(List<SetOfPlannedExpenses> setOfPlannedExpenses) {
        if (setOfPlannedExpenses == null) {
            throw new NullPointerException("PlannedExpenses cannot be null");
        }
        return setOfPlannedExpenses.stream()
                .map(this::toSetOfPlannedExpensesResponse)
                .collect(Collectors.toList());
    }
}
