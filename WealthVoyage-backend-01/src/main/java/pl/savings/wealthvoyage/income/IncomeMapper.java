package pl.savings.wealthvoyage.income;

import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;
@Component
public class IncomeMapper {

    public Income toIncome(IncomeRequest request) {
        if (request == null) {
            throw new NullPointerException("Request cannot be null");
        }
        return Income.builder()
                .id(request.getId())
                .amount(request.getAmount())
                .incomeDate(request.getIncomeDate())
                .sourceOfIncome(request.getSourceOfIncome())
                .typeofIncome(request.getTypeOfIncome())
                .description(request.getDescription())

                .build();
    }

    public IncomeResponse toIncomeResponse(Income monthlyIncome) {
        if (monthlyIncome == null) {
            throw new NullPointerException("MonthlyIncome cannot be null");
        }
        return IncomeResponse.builder()
                .id(monthlyIncome.getId())
                .amount(monthlyIncome.getAmount())
                .incomeDate(monthlyIncome.getIncomeDate())
                .sourceOfIncome(monthlyIncome.getSourceOfIncome())
                .typeOfIncome(monthlyIncome.getTypeofIncome())
                .description(monthlyIncome.getDescription())

                .build();
    }

    public List<IncomeResponse> toIncomeResponseList(List<Income> monthlyIncomes) {
        if (monthlyIncomes == null) {
            throw new NullPointerException("MonthlyIncomes cannot be null");
        }
        return monthlyIncomes.stream()
                .map(this::toIncomeResponse)
                .collect(Collectors.toList());
    }

}
