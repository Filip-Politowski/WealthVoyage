package pl.savings.wealthvoyage.monthlyIncome;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MonthlyIncomeResponse {
    private Integer id;
    private Double amount;
    private String incomeDate;
    private SourceOfIncome sourceOfIncome;



}
