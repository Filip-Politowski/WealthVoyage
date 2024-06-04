package pl.savings.wealthvoyage.income;

import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class IncomeService {
    private final IncomeRepository incomeRepository;
    private final IncomeMapper incomeMapper;

    public IncomeResponse getUserIncomeById(Long id, @NotNull UserDetails userDetails) {
        return incomeMapper.toIncomeResponse(incomeRepository.findByIdAndUsername(id, userDetails.getUsername()).orElseThrow(NoSuchElementException::new));
    }

    public Page<IncomeResponse> getUserIncomes(@NotNull UserDetails userDetails, Pageable pageable) {
        Page<Income> incomePage = incomeRepository.findAllByUsername(userDetails.getUsername(), pageable)
                .orElseThrow(NoSuchElementException::new);
        return incomePage.map(incomeMapper::toIncomeResponse);
    }

    public Income saveUserIncome(IncomeRequest incomeRequest, @NotNull UserDetails userDetails) {
        Income income = incomeMapper.toIncome(incomeRequest);
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
        return incomeRepository.findTotalFixedIncomeByUsername(userDetails.getUsername()).orElseThrow(NoSuchElementException::new);
    }

    public Double getUserSupplementaryIncomeSum(@NotNull UserDetails userDetails) {
        return incomeRepository.findTotalSupplementaryIncomeByUsername(userDetails.getUsername()).orElseThrow(NoSuchElementException::new);
    }


}
