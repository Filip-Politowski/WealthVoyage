package pl.savings.wealthvoyage.savingGoals;

import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.savings.wealthvoyage.transactions.TransactionService;
import pl.savings.wealthvoyage.transactions.TransactionType;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SavingGoalService {
    private final SavingGoalRepository savingGoalRepository;
    private final SavingGoalMapper savingGoalMapper;
    private final TransactionService transactionService;

    public SavingGoalResponse getUserSavingGoalById(Long id, @NotNull UserDetails userDetails) {
        return savingGoalMapper.toSavingGoalResponse(savingGoalRepository.findByIdAndUsername(id, userDetails.getUsername()).orElseThrow(NoSuchElementException::new));
    }

    public List<SavingGoalResponse> getUserSavingGoals(@NotNull UserDetails userDetails) {
        return savingGoalMapper.toSavingGoalResponseList(savingGoalRepository.findAllByUsername(userDetails.getUsername()).orElseThrow(NoSuchElementException::new));
    }

    public SavingGoal saveUserSavingGoal(SavingGoalRequest savingGoalRequest, @NotNull UserDetails userDetails) {
        SavingGoal savingGoal = savingGoalMapper.toSavingGoal(savingGoalRequest);
        savingGoal.setUsername(userDetails.getUsername());
        savingGoalRepository.save(savingGoal);
        if (savingGoal.getAmountSaved() > 0) {
            transactionService.addSavingGoalTransaction(savingGoal, TransactionType.INCOME, savingGoal.getAmountSaved());
        }
        return savingGoal;
    }

    @Transactional
    public void deleteUserSavingGoalById(Long id, @NotNull UserDetails userDetails) {
        Optional<SavingGoal> optionalSavingGoal = savingGoalRepository.findByIdAndUsername(id, userDetails.getUsername());
        if (optionalSavingGoal.isPresent()) {
            SavingGoal savingGoal = optionalSavingGoal.get();
            transactionService.deleteTransactionBySavingGoal(userDetails, savingGoal);
        }

        savingGoalRepository.deleteByIdAndUsername(id, userDetails.getUsername());
    }

    public void updateUserSavingGoal(Long id, SavingGoalRequest savingGoalRequest, @NotNull UserDetails userDetails) {
        Optional<SavingGoal> optionalSavingGoalBeforeUpdate = savingGoalRepository.findByIdAndUsername(id, userDetails.getUsername());

        if (optionalSavingGoalBeforeUpdate.isPresent()) {
            SavingGoal savingGoalBeforeUpdate = optionalSavingGoalBeforeUpdate.get();

            SavingGoal updatedSavingGoal = savingGoalMapper.toSavingGoal(savingGoalRequest);
            updatedSavingGoal.setUsername(userDetails.getUsername());
            updatedSavingGoal.setId(id);

            double amountDifference = updatedSavingGoal.getAmountSaved() - savingGoalBeforeUpdate.getAmountSaved();

            if (amountDifference != 0) {
                TransactionType transactionType = amountDifference > 0 ? TransactionType.INCOME : TransactionType.EXPENSE;
                transactionService.addSavingGoalTransaction(updatedSavingGoal, transactionType, Math.abs(amountDifference));
            }

            savingGoalRepository.save(updatedSavingGoal);
        }
    }

    public Double getUserSavingGoalSum(@NotNull UserDetails userDetails) {
        return savingGoalRepository.findAllByUsername(userDetails.getUsername()).orElseThrow(NoSuchElementException::new).stream().mapToDouble(SavingGoal::getAmountSaved).sum();
    }

    public Double getUserSavingGoalAmountSum(@NotNull UserDetails userDetails) {
        return savingGoalRepository.findAllByUsername(userDetails.getUsername()).orElseThrow(NoSuchElementException::new).stream().mapToDouble(SavingGoal::getSavingGoalAmount).sum();
    }
}
