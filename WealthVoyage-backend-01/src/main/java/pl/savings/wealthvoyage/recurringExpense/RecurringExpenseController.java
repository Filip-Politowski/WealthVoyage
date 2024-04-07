package pl.savings.wealthvoyage.recurringExpense;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/recurringExpenses")
public class RecurringExpenseController {
    private final RecurringExpenseService recurringExpenseService;
    @GetMapping("/{id}")
    public RecurringExpenseResponse  getUserRecurringExpense(@PathVariable Long id, @AuthenticationPrincipal UserDetails userDetails) {
        return recurringExpenseService.getUserRecurringExpense(id, userDetails);
    }
    @GetMapping("/all")
    public List<RecurringExpenseResponse>  getUserRecurringExpenses(@AuthenticationPrincipal UserDetails userDetails) {
        return recurringExpenseService.getUserRecurringExpenses(userDetails);
    }

    @GetMapping("/monthlySum")
    public Double getUserRecurringExpensesMonthlySum(@AuthenticationPrincipal UserDetails userDetails) {
        return recurringExpenseService.getUserRecurringExpensesMonthlySum(userDetails);
    }
    @GetMapping("/yearlySum")
    public Double getUserRecurringExpensesYearlySum(@AuthenticationPrincipal UserDetails userDetails) {
        return recurringExpenseService.getUserRecurringExpensesYearlySum(userDetails);
    }

    @PostMapping("/add")
    public RecurringExpense addUserRecurringExpense(@RequestBody RecurringExpenseRequest recurringExpenseRequest, @AuthenticationPrincipal UserDetails userDetails) {
        return recurringExpenseService.saveUserRecurringExpense(recurringExpenseRequest, userDetails);
    }
    @PutMapping("/update/{id}")
    public void updateUserRecurringExpense(@PathVariable Long id, @RequestBody RecurringExpenseRequest recurringExpenseRequest, @AuthenticationPrincipal UserDetails userDetails) {
        recurringExpenseService.updateUserRecurringExpense(id, recurringExpenseRequest, userDetails);
    }
    @DeleteMapping("/delete/{id}")
    public void deleteUserRecurringExpense(@PathVariable Long id, @AuthenticationPrincipal UserDetails userDetails) {
        recurringExpenseService.deleteUserRecurringExpenseById(id, userDetails);
    }
}
