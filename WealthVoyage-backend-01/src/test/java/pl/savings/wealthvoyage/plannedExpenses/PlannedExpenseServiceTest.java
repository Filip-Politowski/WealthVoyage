package pl.savings.wealthvoyage.plannedExpenses;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.test.context.support.WithMockUser;


import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

// ... import other necessary classes

@ExtendWith(MockitoExtension.class)
class PlannedExpenseServiceTest {

    @Mock
    private PlannedExpenseMapper plannedExpenseMapper;

    @Mock
    private PlannedExpenseRepository plannedExpenseRepository;

    @InjectMocks
    private PlannedExpenseService plannedExpenseService;

    @Test
    @WithMockUser(username = "testUser")
    void saveUserPlannedExpense_shouldSaveExpenseWithUsername() {
        //Given
        PlannedExpenseRequest request = new PlannedExpenseRequest(
                1L,
                "holidays",
                300.0,
                "2024-02-02",
                Status.PAID,
                2,
                "Super holidays",
                PaymentMethod.BANK_TRANSFER
        );
        UserDetails userDetails = User.withUsername("testUser").password("password").roles("USER").build();


        PlannedExpense plannedExpense = new PlannedExpense(1L,
                "holidays",
                300.0,
                "2024-02-02",
                Status.PAID,
                2,
                "Super holidays",
                PaymentMethod.BANK_TRANSFER,
                "testUser");

        //When
        when(plannedExpenseMapper.toPlannedExpense(request)).thenReturn(plannedExpense);
        PlannedExpense savedExpense = plannedExpenseService.saveUserPlannedExpense(request, userDetails);

        //Then
        verify(plannedExpenseMapper).toPlannedExpense(request);
        verify(plannedExpenseRepository).save(plannedExpense);
        assertEquals("testUser", savedExpense.getUsername());
    }


}