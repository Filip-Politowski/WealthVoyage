package pl.savings.wealthvoyage.income;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class IncomeRequest {
    private Integer id;
    private Double amount;
    private String incomeDate;
    private SourceOfIncome sourceOfIncome;
}
