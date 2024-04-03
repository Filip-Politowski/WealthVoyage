package pl.savings.wealthvoyage.income;

import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/incomes")
public class IncomeController {
    private final IncomeService incomeService;

    @GetMapping("/sum")
    public Double getUserIncomesSum(@AuthenticationPrincipal UserDetails userDetails) {
        return incomeService.getUserIncomeSum(userDetails);
    }

}
