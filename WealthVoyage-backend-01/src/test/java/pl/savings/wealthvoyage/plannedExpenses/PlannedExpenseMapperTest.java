package pl.savings.wealthvoyage.plannedExpenses;


import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

class PlannedExpenseMapperTest {

    private PlannedExpenseMapper plannedExpenseMapper;


    @BeforeEach
    void setUp() {
        plannedExpenseMapper = new PlannedExpenseMapper();
    }

    @Test
    public void shouldMapPlannedExpanseRequestToPlannedExpanse() {
        //Given
        PlannedExpenseRequest plannedExpenseRequest = new PlannedExpenseRequest(
                1L,
                "holidays",
                300.0,
                "2024-02-02",
                Status.PAID,
                2,
                "Super holidays",
                PaymentMethod.BANK_TRANSFER
        );
        //When
        PlannedExpense plannedExpense = plannedExpenseMapper.toPlannedExpense(plannedExpenseRequest);
        //Then
        assertEquals(plannedExpenseRequest.getCategory(), plannedExpense.getCategory());
        assertEquals(plannedExpenseRequest.getAmount(), plannedExpense.getAmount());
        assertEquals(plannedExpenseRequest.getPaymentDate(), plannedExpense.getPaymentDate());
        assertEquals(plannedExpenseRequest.getStatus(), plannedExpense.getStatus());
        assertEquals(plannedExpenseRequest.getPriority(), plannedExpense.getPriority());
        assertEquals(plannedExpenseRequest.getDescription(), plannedExpense.getDescription());
        assertEquals(plannedExpenseRequest.getPaymentMethod(), plannedExpense.getPaymentMethod());


    }
    @Test
    public void shouldThrowNullPointerExceptionWhenPlannedExpanseRequestIsNull() {
        //Given
        //When
        //Then
      NullPointerException  message = assertThrows(NullPointerException.class, () -> plannedExpenseMapper.toPlannedExpense(null));
        assertEquals("Request cannot be null", message.getMessage());

    }
    @Test
    public void shouldThrowNullPointerExceptionWhenPlannedExpanseIsNull() {
        //Given
        //When
        //Then
        NullPointerException message = assertThrows(NullPointerException.class, () -> plannedExpenseMapper.toPlannedExpenseResponse(null));
        assertEquals("PlannedExpense cannot be null", message.getMessage());
    }
    @Test
    public void shouldMapPlannedExpanseToPlannedExpanseResponse() {
        //Given
        PlannedExpense plannedExpense = new PlannedExpense(
                1L,
                "holidays",
                300.0,
                "2024-02-02",
                Status.PAID,
                2,
                "Super holidays",
                PaymentMethod.BANK_TRANSFER,
                "User"
        );
        //When
        PlannedExpenseResponse plannedExpenseResponse = plannedExpenseMapper.toPlannedExpenseResponse(plannedExpense);
        //Then
        assertEquals(plannedExpense.getId(), plannedExpenseResponse.getId());
        assertEquals(plannedExpense.getCategory(), plannedExpenseResponse.getCategory());
        assertEquals(plannedExpense.getAmount(), plannedExpenseResponse.getAmount());
        assertEquals(plannedExpense.getPaymentDate(), plannedExpenseResponse.getPaymentDate());
        assertEquals(plannedExpense.getStatus(), plannedExpenseResponse.getStatus());
        assertEquals(plannedExpense.getPriority(), plannedExpenseResponse.getPriority());
        assertEquals(plannedExpense.getDescription(), plannedExpenseResponse.getDescription());
    }
}