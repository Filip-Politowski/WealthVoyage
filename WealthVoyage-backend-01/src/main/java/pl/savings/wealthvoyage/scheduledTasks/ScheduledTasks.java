package pl.savings.wealthvoyage.scheduledTask;

import lombok.Data;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import pl.savings.wealthvoyage.income.Income;
import pl.savings.wealthvoyage.income.IncomeService;
import pl.savings.wealthvoyage.recurringExpense.RecurringExpenseService;
import pl.savings.wealthvoyage.transactions.TransactionService;

import java.time.LocalDate;
import java.util.List;

@Component
@Data
public class ScheduledTasks {
    private final RecurringExpenseService recurringExpenseService;
    private final IncomeService incomeService;
    private final TransactionService transactionService;

    @Scheduled(cron = "0 0 0 * * ?")
    public void updateRecurringExpenseTask() {

        recurringExpenseService.UpdateRecurringExpensesAutomaticallyWhenTheDateExpires();
    }

    @Scheduled(cron = "0 0 0 * * ?")
    public void addIncomeToTransactionOnTheDate() {
        List<Income> incomes = incomeService.getAllIncomesWithoutSinglePayment();
        LocalDate today = LocalDate.now();
        String formattedMonth = String.format("%02d", today.getMonthValue());

        for (Income income : incomes) {
            String incomeFormattedDate = String.format("%02d", income.getIncomeDate().getMonth() + 1);

            if (incomeFormattedDate.equals(formattedMonth)) {
                transactionService.addIncomeTransaction(income);
            }
        }
    }
}
