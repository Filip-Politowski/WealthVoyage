package pl.savings.wealthvoyage.plannedExpenses;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/planedExpenses")
public class PlannedExpenseController {
    private final PlannedExpenseService plannedExpenseService;

    @GetMapping("/all")
    public List<PlannedExpenseResponse> getAllUserPlannedExpenses(@AuthenticationPrincipal UserDetails userDetails) {

        return plannedExpenseService.getAllPlannedExpensesByUsername(userDetails);
    }

    @GetMapping("/{id}")
    public PlannedExpenseResponse getUserPlanedExpense(@AuthenticationPrincipal UserDetails userDetails, @PathVariable Long id) {

        return plannedExpenseService.getUserPlannedExpenseById(id, userDetails);
    }

    @DeleteMapping("/{id}")
    public void deleteUserPlanedExpense(@AuthenticationPrincipal UserDetails userDetails, @PathVariable Long id) {

        plannedExpenseService.deleteUserPlannedExpenseById(id, userDetails);
    }

    @PostMapping("/add")
    public void addUserPlannedExpense(@AuthenticationPrincipal UserDetails userDetails, @RequestBody PlannedExpenseRequest plannedExpenseRequest) {

        plannedExpenseService.saveUserPlannedExpense(plannedExpenseRequest, userDetails);
    }

    @PutMapping("/{id}")
    public void updateUserPlannedExpense(@AuthenticationPrincipal UserDetails userDetails, @PathVariable Long id, @RequestBody PlannedExpenseRequest plannedExpenseRequest) {

        plannedExpenseService.updateUserPlannedExpense(id, plannedExpenseRequest, userDetails);
    }
}
