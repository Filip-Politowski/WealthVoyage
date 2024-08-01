package pl.savings.wealthvoyage.income;

import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/incomes")
public class IncomeController {
    private final IncomeService incomeService;

    @GetMapping("/filtered/month/{monthDate}/{typeOfIncome}/{incomeStatus}")
    public Page<IncomeResponse> getUserFilteredIncomes(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable @DateTimeFormat(pattern = "yyyy-MM") Date monthDate,
            @PathVariable TypeOfIncome typeOfIncome,
            @PathVariable IncomeStatus incomeStatus,
            Pageable pageable) {
        return incomeService.getUserIncomeBySelectedMonthAndTypeOfIncomeAndStatusOfIncome(userDetails, monthDate, typeOfIncome, incomeStatus, pageable);
    }
    @GetMapping("/getSumInCurrentMonth")
    public Double getSumOfIncomeInCurrentMonth(@AuthenticationPrincipal UserDetails userDetails){
        return incomeService.getUserIncomesInCurrentMonth(userDetails);
    }

    @GetMapping("/filtered/range/{startDate}/{endDate}/{typeOfIncome}/{incomeStatus}")
    public Page<IncomeResponse> getUserIncomesByTimeRange(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
            @PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate,
            @PathVariable TypeOfIncome typeOfIncome,
            @PathVariable IncomeStatus incomeStatus,
            Pageable pageable) {
        return incomeService.getUserIncomesByTimeRange(userDetails, startDate, endDate, typeOfIncome, incomeStatus, pageable);
    }

    @GetMapping("/filtered/year/{year}/{typeOfIncome}/{incomeStatus}")
    public Page<IncomeResponse> getUserIncomesByYear(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable int year,
            @PathVariable TypeOfIncome typeOfIncome,
            @PathVariable IncomeStatus incomeStatus,
            Pageable pageable) {
        return incomeService.getUserIncomesByYear(userDetails, year, typeOfIncome, incomeStatus, pageable);
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
