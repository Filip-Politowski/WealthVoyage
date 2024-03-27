package pl.savings.wealthvoyage.plannedExpenses;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.savings.wealthvoyage.configuration.JwtService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/planedExpenses")
public class PlannedExpenseController {
    private final PlannedExpenseService plannedExpenseService;

    @GetMapping("/")
    public List<PlannedExpenseResponse> getPlannedExpenses(@AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails.getUsername();
        return plannedExpenseService.getPlannedExpenses(username);
    }
}
