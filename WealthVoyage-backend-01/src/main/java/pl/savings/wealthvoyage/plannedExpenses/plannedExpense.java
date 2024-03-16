package pl.savings.wealthvoyage.plannedExpenses;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

public class plannedExpense {

    private Integer Id;
    private String category;
    private double amount;
    private String date;
    @Enumerated(EnumType.STRING)
    private Status status;
    private Integer priority;
    private String description;
    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod;


}
