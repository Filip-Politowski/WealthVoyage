package pl.savings.wealthvoyage.income;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.savings.wealthvoyage.transactions.Transaction;

import java.util.Date;
import java.util.List;


@Entity
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Income {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private Double amount;
    @Temporal(TemporalType.DATE)
    private Date incomeDate;
    @Enumerated(EnumType.STRING)
    private SourceOfIncome sourceOfIncome;
    @Enumerated(EnumType.STRING)
    private TypeOfIncome typeofIncome;
    private String description;
    @Enumerated(EnumType.STRING)
    private IncomeStatus incomeStatus;
    @OneToMany(mappedBy = "income")
    private List<Transaction> transactions;


}
