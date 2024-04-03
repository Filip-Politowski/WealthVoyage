package pl.savings.wealthvoyage.monthlyIncome;

import java.util.List;
import java.util.stream.Collectors;

public class MonthlyIncomeMapper {

    public MonthlyIncome toMonthlyIncome(MonthlyIncomeRequest request) {
        if (request == null) {
            throw new NullPointerException("Request cannot be null");
        }
        return MonthlyIncome.builder()
                .id(request.getId())
                .amount(request.getAmount())
                .incomeDate(request.getIncomeDate())
                .sourceOfIncome(request.getSourceOfIncome())
                .build();
    }

    public MonthlyIncomeResponse toMonthlyIncomeResponse(MonthlyIncome monthlyIncome) {
        if (monthlyIncome == null) {
            throw new NullPointerException("MonthlyIncome cannot be null");
        }
        return MonthlyIncomeResponse.builder()
                .id(monthlyIncome.getId())
                .amount(monthlyIncome.getAmount())
                .incomeDate(monthlyIncome.getIncomeDate())
                .sourceOfIncome(monthlyIncome.getSourceOfIncome())
                .build();
    }

    public List<MonthlyIncomeResponse> toMonthlyIncomeResponseList(List<MonthlyIncome> monthlyIncomes) {
        if (monthlyIncomes == null) {
            throw new NullPointerException("MonthlyIncomes cannot be null");
        }
        return monthlyIncomes.stream()
                .map(this::toMonthlyIncomeResponse)
                .collect(Collectors.toList());
    }

}
