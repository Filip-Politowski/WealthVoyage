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
        SavingGoal savingGoalFromRequest = savingGoalMapper.toSavingGoal(savingGoalRequest);
        savingGoalFromRequest.setUsername(userDetails.getUsername());
        savingGoalFromRequest.setId(id);
        Optional<SavingGoal> optionalSavingGoalBeforeUpdate = savingGoalRepository.findByIdAndUsername(id, userDetails.getUsername());

        if (optionalSavingGoalBeforeUpdate.isPresent()) {

            SavingGoal savingGoalBeforeUpdate = optionalSavingGoalBeforeUpdate.get();

            if (savingGoalFromRequest.getAmountSaved() > savingGoalBeforeUpdate.getAmountSaved()) {
                Double calculationOfPaymentAmount = savingGoalFromRequest.getAmountSaved() - savingGoalBeforeUpdate.getAmountSaved();

                transactionService.addSavingGoalTransaction(savingGoalFromRequest, TransactionType.INCOME, calculationOfPaymentAmount);
            } else if (savingGoalFromRequest.getAmountSaved() < savingGoalBeforeUpdate.getAmountSaved()) {
                Double calculationOfPaymentAmount = savingGoalBeforeUpdate.getAmountSaved() - savingGoalFromRequest.getAmountSaved();
                transactionService.addSavingGoalTransaction(savingGoalFromRequest, TransactionType.EXPENSE, calculationOfPaymentAmount);
            } else {
                return;
            }
        }


        savingGoalRepository.save(savingGoalFromRequest);
    }

    public Double getUserSavingGoalSum(@NotNull UserDetails userDetails) {
        return savingGoalRepository.findAllByUsername(userDetails.getUsername()).orElseThrow(NoSuchElementException::new).stream().mapToDouble(SavingGoal::getAmountSaved).sum();
    }

    public Double getUserSavingGoalAmountSum(@NotNull UserDetails userDetails) {
        return savingGoalRepository.findAllByUsername(userDetails.getUsername()).orElseThrow(NoSuchElementException::new).stream().mapToDouble(SavingGoal::getSavingGoalAmount).sum();
    }
}
