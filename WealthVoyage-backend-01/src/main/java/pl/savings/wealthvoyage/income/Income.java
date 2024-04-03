package pl.savings.wealthvoyage.income;

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
public class Income {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String username;
    private Double amount;
    private String incomeDate;
    @Enumerated(EnumType.STRING)
    private SourceOfIncome sourceOfIncome;

}
