package pl.savings.wealthvoyage.transactions;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
public class AmountSumWithMonth {
    private Double amount;
    private String month;
}
