package pl.savings.wealthvoyage.savingGoals;

import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.savings.wealthvoyage.user.User;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class SavingGoalService {
    private final SavingGoalRepository savingGoalRepository;
    private final SavingGoalMapper savingGoalMapper;

    public SavingGoalResponse getUserSavingGoalById(Long id, @NotNull UserDetails userDetails){
        return savingGoalMapper.toSavingGoalResponse(savingGoalRepository.findByIdAndUsername(id, userDetails.getUsername()).orElseThrow(NoSuchElementException::new));
    }

    public List<SavingGoalResponse> getUserSavingGoals(@NotNull UserDetails userDetails){
        return savingGoalMapper.toSavingGoalResponseList(savingGoalRepository.findAllByUsername(userDetails.getUsername()).orElseThrow(NoSuchElementException::new));
    }
    public SavingGoal saveUserSavingGoal(SavingGoalRequest savingGoalRequest, @NotNull UserDetails userDetails){
        SavingGoal savingGoal = savingGoalMapper.toSavingGoal(savingGoalRequest);
        savingGoal.setUsername(userDetails.getUsername());
        return savingGoalRepository.save(savingGoal);
    }
    @Transactional
    public void deleteUserSavingGoalById(Long id, @NotNull UserDetails userDetails){
        savingGoalRepository.deleteByIdAndUsername(id, userDetails.getUsername());
    }
    public void updateUserSavingGoal(Long id, SavingGoalRequest savingGoalRequest, @NotNull UserDetails userDetails){
        SavingGoal savingGoal = savingGoalMapper.toSavingGoal(savingGoalRequest);
        savingGoal.setUsername(userDetails.getUsername());
        savingGoal.setId(id);
        savingGoalRepository.save(savingGoal);
    }

    public Double getUserSavingGoalSum(@NotNull UserDetails userDetails){
        return savingGoalRepository.findAllByUsername(userDetails.getUsername()).orElseThrow(NoSuchElementException::new).stream().mapToDouble(SavingGoal::getAmountSaved).sum();
    }
}
