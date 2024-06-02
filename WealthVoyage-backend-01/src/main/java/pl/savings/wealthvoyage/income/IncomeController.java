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

    @GetMapping("/sum")
    public Double getUserIncomesSum(@AuthenticationPrincipal UserDetails userDetails) {
        return incomeService.getUserIncomeSum(userDetails);
    }

    @GetMapping("/all")
    public Page<IncomeResponse> getAllUserIncomes(@AuthenticationPrincipal UserDetails userDetails, Pageable pageable) {
        return incomeService.getUserIncomes(userDetails, pageable);

    }

    @GetMapping("/{id}")
    public IncomeResponse getUserSingleIncome(@AuthenticationPrincipal UserDetails userDetails, @PathVariable Long id) {
        return incomeService.getUserIncomeById(id, userDetails);
    }

    @PostMapping("/add")
    public void addUserIncome(@AuthenticationPrincipal UserDetails userdetails, @RequestBody IncomeRequest incomeRequest) {
        incomeService.saveUserIncome(incomeRequest, userdetails);
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
