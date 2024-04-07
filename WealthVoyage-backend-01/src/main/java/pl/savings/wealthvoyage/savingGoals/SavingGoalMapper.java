package pl.savings.wealthvoyage.savingGoals;

import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class SavingGoalMapper {
    public SavingGoal toSavingGoal(SavingGoalRequest request) {
        if (request == null) {
            throw new NullPointerException("SavingGoalRequest cannot be null");
        }
        return SavingGoal.builder()
                .id(request.getId())
                .savingGoalName(request.getSavingGoalName())
                .savingGoalAmount(request.getSavingGoalAmount())
                .amountSaved(request.getAmountSaved())
                .svgContent(request.getSvgContent())
                .build();
    }

    public SavingGoalResponse toSavingGoalResponse(SavingGoal savingGoal) {
        if (savingGoal == null) {
            throw new NullPointerException("SavingGoal cannot be null");
        }
        return SavingGoalResponse.builder()
                .id(savingGoal.getId())
                .savingGoalName(savingGoal.getSavingGoalName())
                .savingGoalAmount(savingGoal.getSavingGoalAmount())
                .amountSaved(savingGoal.getAmountSaved())
                .svgContent(savingGoal.getSvgContent())
                .build();
    }

    public List<SavingGoalResponse> toSavingGoalResponseList(List<SavingGoal> savingGoals) {
        if (savingGoals == null) {
            throw new NullPointerException("SavingGoals cannot be null");
        }
        return savingGoals.stream()
                .map(this::toSavingGoalResponse)
                .collect(Collectors.toList());
    }

}
