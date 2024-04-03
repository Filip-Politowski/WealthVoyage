package pl.savings.wealthvoyage.monthlyIncome;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;



@Entity
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MonthlyIncome {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String username;
    private String amount;
    private String date;
    @Enumerated(EnumType.STRING)
    private SourceOfIncome sourceOfIncome;

}
