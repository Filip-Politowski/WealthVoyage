package pl.savings.wealthvoyage.income;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.lang.reflect.Type;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class IncomeRequest {
    private Long id;
    private Double amount;
    private String incomeDate;
    private SourceOfIncome sourceOfIncome;
    private TypeOfIncome typeOfIncome;
    private String description;

}
