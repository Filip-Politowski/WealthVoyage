package pl.savings.wealthvoyage.savingGoals;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/savingGoals")
public class SavingGoalController {
    private final SavingGoalService savingGoalService;
    @GetMapping(value = "/get/{id}")
    public SavingGoalResponse getUserSavingGoal(@AuthenticationPrincipal UserDetails userDetails,@PathVariable Long id){
        return savingGoalService.getUserSavingGoalById(id, userDetails);
    }@GetMapping(value = "/all")
    public List<SavingGoalResponse> getUserSavingGoals(@AuthenticationPrincipal UserDetails userDetails){
        return savingGoalService.getUserSavingGoals(userDetails);
    }
    @GetMapping(value = "/get/sum")
    public Double  getUserSavingGoalsSum(@AuthenticationPrincipal UserDetails userDetails){
        return savingGoalService.getUserSavingGoalSum(userDetails);
    }
    @GetMapping(value = "/get/amount/sum")
    public Double  getUserSavingGoalsAmountSum(@AuthenticationPrincipal UserDetails userDetails){
        return savingGoalService.getUserSavingGoalAmountSum(userDetails);
    }

    @PostMapping(value = "/add")
    public SavingGoal saveUserSavingGoal(@RequestBody SavingGoalRequest savingGoalRequest, @AuthenticationPrincipal UserDetails userDetails){
        return savingGoalService.saveUserSavingGoal(savingGoalRequest, userDetails);
    }
    @DeleteMapping(value = "/delete/{id}")
    public void deleteUserSavingGoal(@PathVariable Long id, @AuthenticationPrincipal UserDetails userDetails){
        savingGoalService.deleteUserSavingGoalById(id, userDetails);
    }
    @PutMapping(value = "/update/{id}")
    public void updateUserSavingGoal(@PathVariable Long id, @RequestBody SavingGoalRequest savingGoalRequest, @AuthenticationPrincipal UserDetails userDetails){
        savingGoalService.updateUserSavingGoal(id, savingGoalRequest, userDetails);
    }
}
