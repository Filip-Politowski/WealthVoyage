package pl.savings.wealthvoyage.recurringExpense;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/recurringExpenses")
public class RecurringExpenseController {
    private final RecurringExpenseService recurringExpenseService;

    @GetMapping("/{id}")
    public RecurringExpenseResponse getUserRecurringExpense(@PathVariable Long id, @AuthenticationPrincipal UserDetails userDetails) {
        return recurringExpenseService.getUserRecurringExpense(id, userDetails);
    }

    @GetMapping("/all")
    public Page<RecurringExpenseResponse> getUserRecurringExpenses(@AuthenticationPrincipal UserDetails userDetails, Pageable pageable) {
        return recurringExpenseService.getUserRecurringExpenses(userDetails, pageable);
    }

    @GetMapping("/all/{expenseFrequency}")
    public Page<RecurringExpenseResponse> getUserRecurringExpensesByExpenseFrequency(@AuthenticationPrincipal UserDetails userDetails, @PathVariable ExpenseFrequency expenseFrequency, Pageable pageable) {
        return recurringExpenseService.getUserRecurringExpensesByExpenseFrequency(userDetails, expenseFrequency, pageable);
    }

    @GetMapping("/monthlySum")
    public Double getUserRecurringExpensesMonthlySum(@AuthenticationPrincipal UserDetails userDetails, Pageable pageable) {
        return recurringExpenseService.getUserRecurringExpensesMonthlySum(userDetails, pageable);
    }

    @GetMapping("/yearlySum")
    public Double getUserRecurringExpensesYearlySum(@AuthenticationPrincipal UserDetails userDetails, Pageable pageable) {
        return recurringExpenseService.getUserRecurringExpensesYearlySum(userDetails, pageable);
    }

    @GetMapping("/sumsOfExpensesInCurrentMonth")
    public Map<String,Double> getUserSumOfExpensesInCurrentMonth(@AuthenticationPrincipal UserDetails userDetails){
        return recurringExpenseService.getUserSumsOfExpensesInCurrentMonth(userDetails);
    }
    @GetMapping("/amountOfSumsInCurrentMonth")
    public Double getUserAmountOfRecurringExpensesInCurrentMonth(@AuthenticationPrincipal UserDetails userDetails){
        return recurringExpenseService.getAmountOfSumUserExpensesInCurrentMonth(userDetails);
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
