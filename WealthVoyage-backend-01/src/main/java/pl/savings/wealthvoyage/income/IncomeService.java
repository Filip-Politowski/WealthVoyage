package pl.savings.wealthvoyage.income;

import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class IncomeService {
    private final IncomeRepository incomeRepository;
    private final IncomeMapper incomeMapper;

    public IncomeResponse getUserIncomeById(Long id, @NotNull UserDetails userDetails) {
        return incomeMapper.toIncomeResponse(incomeRepository.findByIdAndUsername(id, userDetails.getUsername()).orElseThrow(NoSuchElementException::new));
    }

    public Page<IncomeResponse> getUserActiveIncomes(@NotNull UserDetails userDetails, Pageable pageable) {
        Page<Income> incomePage = incomeRepository.findAllByUsernameAndIncomeStatus(userDetails.getUsername(), IncomeStatus.ACTIVE, pageable)
                .orElseThrow(NoSuchElementException::new);
        return incomePage.map(incomeMapper::toIncomeResponse);
    }

    public Page<IncomeResponse> getUserInactiveIncomes(@NotNull UserDetails userDetails, Pageable pageable) {
        Page<Income> incomePage = incomeRepository.findAllByUsernameAndIncomeStatus(userDetails.getUsername(), IncomeStatus.INACTIVE, pageable)
                .orElseThrow(NoSuchElementException::new);
        return incomePage.map(incomeMapper::toIncomeResponse);
    }

    public Income saveUserIncome(IncomeRequest incomeRequest, @NotNull UserDetails userDetails) {
        Income income = incomeMapper.toIncome(incomeRequest);
        income.setIncomeStatus(IncomeStatus.ACTIVE);
        income.setUsername(userDetails.getUsername());
        return incomeRepository.save(income);
    }

    @Transactional
    public void deleteUserIncomeById(Long id, @NotNull UserDetails userDetails) {
        incomeRepository.deleteByIdAndUsername(id, userDetails.getUsername());
    }

    public void updateUserIncome(Long id, IncomeRequest incomeRequest, @NotNull UserDetails userDetails) {
        Income income = incomeMapper.toIncome(incomeRequest);
        income.setUsername(userDetails.getUsername());
        income.setId(id);
        incomeRepository.save(income);
    }

    public Double getUserFixedIncomeSum(@NotNull UserDetails userDetails) {
        return incomeRepository.findTotalFixedIncomeByUsername(userDetails.getUsername()).orElse(0.0);
    }

    public Double getUserSupplementaryIncomeSum(@NotNull UserDetails userDetails) {
        return incomeRepository.findTotalSupplementaryIncomeByUsername(userDetails.getUsername()).orElse(0.0);
    }

    public void deactivateIncome(@NotNull UserDetails userDetails, Long id) {

        Optional<Income> optionalIncome = incomeRepository.findByIdAndUsername(id, userDetails.getUsername());
        optionalIncome.ifPresentOrElse(income ->
                {
                    income.setIncomeStatus(IncomeStatus.INACTIVE);
                    incomeRepository.save(income);
                },
                () -> {
                    throw new NoSuchElementException("Income not found for user " + userDetails.getUsername() + " and id " + id);
                }
        );
    }

    public void activateIncome(@NotNull UserDetails userDetails, Long id) {

        Optional<Income> optionalIncome = incomeRepository.findByIdAndUsername(id, userDetails.getUsername());
        optionalIncome.ifPresentOrElse(income ->
                {
                    income.setIncomeStatus(IncomeStatus.ACTIVE);
                    incomeRepository.save(income);
                },
                () -> {
                    throw new NoSuchElementException("Income not found for user " + userDetails.getUsername() + " and id " + id);
                }
        );
    }
}
