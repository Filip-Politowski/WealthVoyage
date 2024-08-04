package pl.savings.wealthvoyage.scheduledTasks;

import lombok.Data;
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



    @Scheduled(cron = "0 0 0 * * ?")
    public void updateRecurringExpenseTask() {
        recurringExpenseService.UpdateRecurringExpensesAutomaticallyWhenTheDateExpires();
    }

    @Scheduled(cron = "0 0 0 * * ?")
    public void addIncomeTransactionTask() {
        incomeService.addIncomeToTransactionOnTheDate();
    }

    @Scheduled(cron = "0 0 0 * * ?")
    public void addRecurringExpenseTransactionTask(){
        recurringExpenseService.addRecurringExpenseTransactionToDataBase();
    }
}
