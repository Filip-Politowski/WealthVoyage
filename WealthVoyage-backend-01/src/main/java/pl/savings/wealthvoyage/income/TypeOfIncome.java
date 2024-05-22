package pl.savings.wealthvoyage.income;

import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;


public enum TypeOfIncome {
    FIXED_INCOME,
    SUPPLEMENTARY_INCOME,
}
