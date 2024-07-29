package pl.savings.wealthvoyage.setOfPlannedExpenses;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "api/setOfPlannedExpenses")
public class SetOfPlannedExpensesController {
    private final SetOfPlannedExpensesService setOfPlannedExpensesService;

    @GetMapping(value = "/{id}")
    public SetOfPlannedExpensesResponse getUserSetOfPlannedExpenses(@AuthenticationPrincipal UserDetails userDetails, @PathVariable Long id) {
        return setOfPlannedExpensesService.getUserSetOfPlannedExpenses(userDetails, id);
    }

    @GetMapping(value = "/all")
    public List<SetOfPlannedExpensesResponse> getAllUserSetOfPlannedExpenses(@AuthenticationPrincipal UserDetails userDetails) {
        return setOfPlannedExpensesService.getAllUserSetOfPlannedExpenses(userDetails);
    }

    @PostMapping(value = "/add")
    public void addUserSetOfPlannedExpenses(@AuthenticationPrincipal UserDetails userDetails, @RequestBody SetOfPlannedExpensesRequest setOfPlannedExpensesRequest) {
        setOfPlannedExpensesService.addUserSetOfPlannedExpenses(userDetails, setOfPlannedExpensesRequest);
    }

    @PutMapping(value = "/update/{id}")
    public void updateUserSetOfPlannedExpenses(@AuthenticationPrincipal UserDetails userDetails, @RequestBody SetOfPlannedExpensesRequest setOfPlannedExpensesRequest, @PathVariable Long id) {
        setOfPlannedExpensesService.updateUserSetOfPlannedExpenses(userDetails, setOfPlannedExpensesRequest, id);
    }

    @DeleteMapping(value = "/delete/{id}")
    public void deleteUserSetOfPlannedExpenses(@PathVariable Long id, @AuthenticationPrincipal UserDetails userDetails) {
        setOfPlannedExpensesService.deleteUserSetOfPlannedExpenses(id, userDetails);
    }


}
