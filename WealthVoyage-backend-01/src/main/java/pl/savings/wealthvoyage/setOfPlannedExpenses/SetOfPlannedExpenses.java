package pl.savings.wealthvoyage.setOfPlannedExpenses;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.savings.wealthvoyage.plannedExpenses.PlannedExpense;

import java.util.List;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name ="set_of_planned_expenses")
public class SetOfPlannedExpenses {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String name;
    private Double amount;
    @OneToMany(mappedBy = "setOfPlannedExpenses", cascade = CascadeType.ALL)
    private List<PlannedExpense> plannedExpenses;

}
