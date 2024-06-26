package pl.savings.wealthvoyage.income;

import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import pl.savings.wealthvoyage.exceptions.InvalidNumberOfMonthsException;

import java.lang.reflect.Type;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.Date;
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


    public Page<IncomeResponse> getUserIncomeBySelectedMonthAndTypeOfIncomeAndStatusOfIncome(
            @NotNull UserDetails userDetails,
            Date monthDate,
            TypeOfIncome typeOfIncome,
            IncomeStatus incomeStatus,
            Pageable pageable
    ) {
        LocalDate localMonthDate = monthDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate().withDayOfMonth(1);  // Ensure first day of month
        Date startDate = Date.from(localMonthDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
        Date endDate = Date.from(localMonthDate.plusMonths(1).atStartOfDay(ZoneId.systemDefault()).toInstant());

        Page<Income> incomePage = incomeRepository.findIncomesByUsernameAndMonthAndStatusAndType(userDetails.getUsername(), startDate, endDate, incomeStatus, typeOfIncome, pageable);
        return incomePage.map(incomeMapper::toIncomeResponse);
    }

    public Page<IncomeResponse> getUserIncomesByTimeRange(
            @NotNull UserDetails userDetails,
            Date startDate,
            Date endDate,
            TypeOfIncome typeOfIncome,
            IncomeStatus incomeStatus,
            Pageable pageable
    ) {

        LocalDate endLocalDate = endDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        // Adjust the end date to the end of the day for inclusiveness
        Date inclusiveEndDate = Date.from(endLocalDate.plusDays(1).atStartOfDay(ZoneId.systemDefault()).toInstant().minusMillis(1));

        Page<Income> incomePage = incomeRepository.findIncomesByUsernameAndDateRangeAndStatusAndType(
                userDetails.getUsername(), startDate, inclusiveEndDate, incomeStatus, typeOfIncome, pageable
        );
        return incomePage.map(incomeMapper::toIncomeResponse);
    }

    public Page<IncomeResponse> getUserIncomesByYear(
            @NotNull UserDetails userDetails,
            int year,
            TypeOfIncome typeOfIncome,
            IncomeStatus incomeStatus,
            Pageable pageable
    ) {
        LocalDate firstDayOfYear = LocalDate.of(year, 1, 1);
        LocalDate firstDayOfNextYear = firstDayOfYear.plusYears(1);


        Date startDate = Date.from(firstDayOfYear.atStartOfDay(ZoneId.systemDefault()).toInstant());
        Date endDate = Date.from(firstDayOfNextYear.atStartOfDay(ZoneId.systemDefault()).toInstant());

        Page<Income> incomePage = incomeRepository.findIncomesByUsernameAndDateRangeAndStatusAndType(
                userDetails.getUsername(), startDate, endDate, incomeStatus, typeOfIncome, pageable);
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
        income.setIncomeStatus(IncomeStatus.ACTIVE);
        income.setId(id);
        incomeRepository.save(income);
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
