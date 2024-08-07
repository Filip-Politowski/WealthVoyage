package pl.savings.wealthvoyage.singleExpense;

import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.ApiStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/singleExpenses")
public class SingleExpenseController {
    private final SingleExpenseService singleExpenseService;

    @GetMapping("/{id}")
    public SingleExpenseResponse getUserSingleExpense(@AuthenticationPrincipal UserDetails userDetails, @PathVariable long id) {
        return singleExpenseService.getUserSingleExpenseById(id, userDetails);
    }

    @GetMapping("/all/{expenseCategory}")
    public Page<SingleExpenseResponse> getAllUserSingleExpenses(
            @AuthenticationPrincipal UserDetails userDetails,
            Pageable pageable,
            @PathVariable ExpenseCategory expenseCategory
    ) {
        return singleExpenseService.getUserAllSingleExpenses(userDetails, pageable, expenseCategory);
    }

    @GetMapping("/byDate/{expenseCategory}/{date}")
    public Page<SingleExpenseResponse> getUserSingleExpensesByDateAndCategory(
            @AuthenticationPrincipal UserDetails userDetails,
            Pageable pageable,
            @PathVariable ExpenseCategory expenseCategory,
            @PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date date
    ) {
        return singleExpenseService.getUserSingleExpensesByCategoryAndDate(userDetails, pageable, expenseCategory, date);
    }


    @GetMapping("/monthly")
    public double getUserSingleExpensesMonthlySum(@AuthenticationPrincipal UserDetails userDetails) {
        return singleExpenseService.calculateTotalExpensesForCurrentMonth(userDetails);
    }

    @GetMapping("/monthly/three")
    public double getUserSingleExpensesSumFromThreeMonths(@AuthenticationPrincipal UserDetails userDetails) {
        return singleExpenseService.calculateTotalExpensesForLastThreeMonths(userDetails);
    }

    @GetMapping("/yearly")
    public double getUserYearlySingleExpensesSum(@AuthenticationPrincipal UserDetails userDetails) {
        return singleExpenseService.calculateTotalExpensesForYear(userDetails);
    }

    @PostMapping("/add")
    public void addUserSingleExpense(@AuthenticationPrincipal UserDetails userDetails, @RequestBody SingleExpenseRequest singleExpenseRequest) {
        singleExpenseService.saveUserSingleExpense(singleExpenseRequest, userDetails);
    }

    @DeleteMapping("/{id}")
    public void deleteUserSingleExpense(@AuthenticationPrincipal UserDetails userDetails, @PathVariable Long id) {
        singleExpenseService.deleteUserSingleExpenseById(id, userDetails);
    }

    @PutMapping("/update/{id}")
    public void updateUserSingleExpense(@AuthenticationPrincipal UserDetails userDetails, @PathVariable Long id, @RequestBody SingleExpenseRequest singleExpenseRequest) {
        singleExpenseService.updateUserSingleExpense(id, singleExpenseRequest, userDetails);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteUserSingleExpenseByID(@AuthenticationPrincipal UserDetails userDetails, @PathVariable Long id){
        singleExpenseService.deleteUserSingleExpenseById(id, userDetails);
    }


}
