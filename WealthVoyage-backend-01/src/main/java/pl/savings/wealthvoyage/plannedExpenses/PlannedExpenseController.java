package pl.savings.wealthvoyage.plannedExpenses;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/plannedExpenses")
public class PlannedExpenseController {
    private final PlannedExpenseService plannedExpenseService;

    @GetMapping("/all")
    public Page<PlannedExpenseResponse> getAllUserPlannedExpenses(@AuthenticationPrincipal UserDetails userDetails, Pageable pageable) {

        return plannedExpenseService.getAllPlannedExpensesByUsername(userDetails, pageable);
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

    @PutMapping("/update/{id}")
    public void updateUserPlannedExpense(@AuthenticationPrincipal UserDetails userDetails, @PathVariable Long id, @RequestBody PlannedExpenseRequest plannedExpenseRequest) {

        plannedExpenseService.updateUserPlannedExpense(id, plannedExpenseRequest, userDetails);
    }

    @PutMapping("/{id}/{status}")
    public PlannedExpenseResponse updateUserPlannedExpenseStatus (@AuthenticationPrincipal UserDetails userDetails, @PathVariable Long id, @PathVariable Status status){
        System.out.println(status);
        return plannedExpenseService.updateUserPlannedExpense(userDetails, id, status);
    }
}
