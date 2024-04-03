package pl.savings.wealthvoyage.income;

import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class IncomeService {
    private final IncomeRepository incomeRepository;
    private final IncomeMapper incomeMapper;

    public IncomeResponse getUserIncomeById(Integer id, @NotNull UserDetails userDetails) {
        return incomeMapper.toIncomeResponse(incomeRepository.findByIdAndUsername(id, userDetails.getUsername()).orElseThrow(NoSuchElementException::new));
    }

    public List<IncomeResponse> getUserIncomes(@NotNull UserDetails userDetails) {
        return incomeMapper.toIncomeResponseList(incomeRepository.findAllByUsername(userDetails.getUsername()).orElseThrow(NoSuchElementException::new));
    }

    public Income saveUserIncome(IncomeRequest incomeRequest, @NotNull UserDetails userDetails) {
        Income income = incomeMapper.toIncome(incomeRequest);
        income.setUsername(userDetails.getUsername());
        return incomeRepository.save(income);
    }
    public void deleteUserIncomeById(Integer id, @NotNull UserDetails userDetails) {
        incomeRepository.deleteByIdAndUsername(id, userDetails.getUsername());
    }
    public void updateUserIncome(Integer id, IncomeRequest incomeRequest, @NotNull UserDetails userDetails) {
        Income income = incomeMapper.toIncome(incomeRequest);
        income.setUsername(userDetails.getUsername());
        income.setId(id);
        incomeRepository.save(income);
    }
    public Double getUserIncomeSum(@NotNull UserDetails userDetails) {
        return incomeRepository.findAllByUsername(userDetails.getUsername()).orElseThrow(NoSuchElementException::new).stream().mapToDouble(Income::getAmount).sum();
    }


}
