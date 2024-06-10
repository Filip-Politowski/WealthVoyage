package pl.savings.wealthvoyage.income;

import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/incomes")
public class IncomeController {
    private final IncomeService incomeService;

    @GetMapping("/sum/months/{numberOfMonths}/{typeOfIncome}")
    public Double getUserIncomesSumFromSelectedMonthsAndSelectedType(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable long numberOfMonths,
            @PathVariable TypeOfIncome typeOfIncome
    ) {
        return incomeService.calculateTotalIncomeForSelectedNumberOfMonths(
                userDetails,
                numberOfMonths,
                typeOfIncome
        );
    }

    @GetMapping("/sum/currentMonth/{typeOfIncome}")
    public Double getUserIncomesSumForCurrentMonthAndSelectedType(@AuthenticationPrincipal UserDetails userDetails, @PathVariable TypeOfIncome typeOfIncome) {
        return incomeService.calculateTotalIncomeForCurrentMonthAndSelectedType(userDetails, typeOfIncome);
    }

    @GetMapping("/sum/selectedYear/{year}/{typeOfIncome}")
    public Double getUserIncomeSumForSelectedYear(@AuthenticationPrincipal UserDetails userDetails, @PathVariable int year, @PathVariable TypeOfIncome typeOfIncome) {
        return incomeService.calculateTotalIncomeForSelectedYear(userDetails, year, typeOfIncome);
    }

    @GetMapping("/supplementary/sum")
    public Double getUserSupplementaryIncomesSum(@AuthenticationPrincipal UserDetails userDetails) {
        return incomeService.getUserSupplementaryIncomeSum(userDetails);
    }


    @GetMapping("/all/active")
    public Page<IncomeResponse> getAllActiveUserIncomes(@AuthenticationPrincipal UserDetails userDetails, Pageable pageable) {
        return incomeService.getUserActiveIncomes(userDetails, pageable);
    }

    @GetMapping("/all/inactive")
    public Page<IncomeResponse> getAllInactiveUserIncomes(@AuthenticationPrincipal UserDetails userDetails, Pageable pageable) {
        return incomeService.getUserInactiveIncomes(userDetails, pageable);
    }

    @GetMapping("/{id}")
    public IncomeResponse getUserSingleIncome(@AuthenticationPrincipal UserDetails userDetails, @PathVariable Long id) {
        return incomeService.getUserIncomeById(id, userDetails);
    }

    @PostMapping("/add")
    public void addUserIncome(@AuthenticationPrincipal UserDetails userdetails, @RequestBody IncomeRequest incomeRequest) {
        incomeService.saveUserIncome(incomeRequest, userdetails);
    }

    @PostMapping("/deactivate/{id}")
    public void deactivateUserIncome(@AuthenticationPrincipal UserDetails userDetails, @PathVariable Long id) {
        incomeService.deactivateIncome(userDetails, id);
    }

    @PostMapping("/activate/{id}")
    public void activateUserIncome(@AuthenticationPrincipal UserDetails userDetails, @PathVariable Long id) {
        incomeService.activateIncome(userDetails, id);
    }

    @DeleteMapping("/{id}")
    public void deleteUserIncomeById(@AuthenticationPrincipal UserDetails userDetails, @PathVariable Long id) {
        incomeService.deleteUserIncomeById(id, userDetails);
    }

    @PutMapping("/update/{id}")
    public void updateUserIncomeById(@AuthenticationPrincipal UserDetails userDetails, @PathVariable Long id, @RequestBody IncomeRequest incomeRequest) {
        incomeService.updateUserIncome(id, incomeRequest, userDetails);
    }


}
