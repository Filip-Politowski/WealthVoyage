package pl.savings.wealthvoyage.scheduledTask;

import lombok.Data;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import pl.savings.wealthvoyage.recurringExpense.RecurringExpenseService;

@Component
@Data
public class ScheduledTasks {
    private final RecurringExpenseService recurringExpenseService;

    @Scheduled(cron = "0 0 0 * * ?")
    public void updateRecurringExpenseTask() {

        recurringExpenseService.UpdateRecurringExpensesAutomaticallyWhenTheDateExpires();
    }
}
