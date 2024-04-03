package pl.savings.wealthvoyage.plannedExpenses;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.test.context.support.WithMockUser;


import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;


@ExtendWith(MockitoExtension.class)
class PlannedExpenseServiceTest {

    @Mock
    private PlannedExpenseMapper plannedExpenseMapper;

    @Mock
    private PlannedExpenseRepository plannedExpenseRepository;

    @InjectMocks
    private PlannedExpenseService plannedExpenseService;

    @Test
    void saveUserPlannedExpense_shouldSaveExpenseByUserNameFromToken() {
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


        PlannedExpense plannedExpense = new PlannedExpense(
                1L,
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

    @Test
    public void testGetAllPlannedExpensesByUsername_WithExpenses() {
        // Mock data
        UserDetails userDetails = User.withUsername("testUser").password("password").roles("USER").build();
        List<PlannedExpense> plannedExpenses = createMockPlannedExpenses(userDetails.getUsername());
        Optional<List<PlannedExpense>> optionalPlannedExpenses = Optional.of(plannedExpenses);
        List<PlannedExpenseResponse> expectedResponses = createMockPlannedExpenseResponses(plannedExpenses);

        // Mock behavior
        when(plannedExpenseRepository.findAllByUsername(userDetails.getUsername())).thenReturn(optionalPlannedExpenses);
        when(plannedExpenseMapper.toPlannedExpenseResponseList(plannedExpenses)).thenReturn(expectedResponses);

        // Call the method
        List<PlannedExpenseResponse> actualResponses = plannedExpenseService.getAllPlannedExpensesByUsername(userDetails);

        // Assertions
        assertEquals(expectedResponses, actualResponses);
        verify(plannedExpenseRepository).findAllByUsername(userDetails.getUsername());

    }

    @Test
    public void testGetAllPlannedExpensesByUsername_EmptyList() {
        // Mock data
        UserDetails userDetails = User.withUsername("testUser").password("password").roles("USER").build();
        Optional<List<PlannedExpense>> optionalPlannedExpenses = Optional.empty();

        // Mock behavior
        when(plannedExpenseRepository.findAllByUsername(userDetails.getUsername())).thenReturn(optionalPlannedExpenses);

        // Call the method
        List<PlannedExpenseResponse> actualResponses = plannedExpenseService.getAllPlannedExpensesByUsername(userDetails);

        // Assertions
        assertEquals(Collections.emptyList(), actualResponses);
        verify(plannedExpenseRepository).findAllByUsername(userDetails.getUsername());
        verifyNoInteractions(plannedExpenseMapper);
    }


    private List<PlannedExpense> createMockPlannedExpenses(String username) {

        PlannedExpense plannedExpense1 = new PlannedExpense(1L, "holidays", 300.0, "2024-02-02", Status.PAID, 3, "Super holidays", PaymentMethod.BANK_TRANSFER, username);
        PlannedExpense plannedExpense2 = new PlannedExpense(2L, "food", 100.0, "2024-03-04", Status.PAID, 1, "Super food", PaymentMethod.BANK_TRANSFER, username);
        List<PlannedExpense> plannedExpenses = new ArrayList<>();
        plannedExpenses.add(plannedExpense1);
        plannedExpenses.add(plannedExpense2);
        return plannedExpenses;

    }

    private List<PlannedExpenseResponse> createMockPlannedExpenseResponses(List<PlannedExpense> plannedExpenses) {
        List<PlannedExpenseResponse> plannedExpenseResponses = new ArrayList<>();
            for(PlannedExpense plannedExpense: plannedExpenses){
                plannedExpenseResponses.add(new PlannedExpenseResponse(plannedExpense.getId(), plannedExpense.getUsername(), plannedExpense.getAmount(), plannedExpense.getPaymentDate(), plannedExpense.getStatus(), plannedExpense.getPriority(), plannedExpense.getDescription(), plannedExpense.getPaymentMethod()));
            }

        return plannedExpenseResponses;
    }
}