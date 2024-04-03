package pl.savings.wealthvoyage.plannedExpenses;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;


@ExtendWith(MockitoExtension.class)
class PlannedExpenseServiceTest {

    @Mock
    private PlannedExpenseMapper plannedExpenseMapper;

    @Mock
    private PlannedExpenseRepository plannedExpenseRepository;

    @InjectMocks
    private PlannedExpenseService plannedExpenseService;

    private final UserDetails userDetails = User.withUsername("testUser").password("password").roles("USER").build();


    @Test
    void saveUserPlannedExpense_shouldSaveExpenseByUserNameFromToken() {
        //Given
        //When
        when(plannedExpenseMapper.toPlannedExpense(createMockPlannedExpenseRequest())).thenReturn(createMockPlannedExpense());
        PlannedExpense savedExpense = plannedExpenseService.saveUserPlannedExpense(createMockPlannedExpenseRequest(), userDetails);

        //Then
        verify(plannedExpenseMapper).toPlannedExpense(createMockPlannedExpenseRequest());
        verify(plannedExpenseRepository).save(createMockPlannedExpense());
        assertEquals("testUser", savedExpense.getUsername());
    }

    @Test
    public void testGetAllPlannedExpensesByUsername_WithExpenses() {
        // Mock data

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

    @Test
    public void testGetUserPlannedExpenseById_ExistingExpense() {
        // Mock data
        Long id = 1L;

        PlannedExpense plannedExpense = createMockPlannedExpense(id);
        PlannedExpenseResponse expectedResponse = createMockPlannedExpenseResponse(plannedExpense);
        Optional<PlannedExpense> optionalPlannedExpense = Optional.of(plannedExpense);

        // Mock behavior
        when(plannedExpenseRepository.findByIdAndUsername(id, userDetails.getUsername())).thenReturn(optionalPlannedExpense);
        when(plannedExpenseMapper.toPlannedExpenseResponse(plannedExpense)).thenReturn(expectedResponse);

        // Call the method
        PlannedExpenseResponse actualResponse = plannedExpenseService.getUserPlannedExpenseById(id, userDetails);

        // Assertions
        assertEquals(expectedResponse, actualResponse);
        verify(plannedExpenseRepository).findByIdAndUsername(id, userDetails.getUsername());
        verify(plannedExpenseMapper).toPlannedExpenseResponse(plannedExpense);
    }

    @Test
    public void testGetUserPlannedExpenseById_NonexistentExpense() {
        // Mock data
        Long id = 1L;
        Optional<PlannedExpense> optionalPlannedExpense = Optional.empty();

        // Mock behavior
        when(plannedExpenseRepository.findByIdAndUsername(id, userDetails.getUsername())).thenReturn(optionalPlannedExpense);

        // Call the method
        assertThrows(NoSuchElementException.class, () -> plannedExpenseService.getUserPlannedExpenseById(id, userDetails));

        // Assertions
        verify(plannedExpenseRepository).findByIdAndUsername(id, userDetails.getUsername());

    }

    @Test
    public void testGetUserPlannedExpenseById_NullUserDetails() {
        assertThrows(IllegalArgumentException.class, () -> plannedExpenseService.getUserPlannedExpenseById(1L, null));
    }
    @Test
    public void testDeleteUserPlannedExpenseById_Success() {
        // Mock data
        Long id = 1L;
        // Mock behavior
        doNothing().when(plannedExpenseRepository).deleteByIdAndUsername(id, userDetails.getUsername());

        // Call the method
        plannedExpenseService.deleteUserPlannedExpenseById(id, userDetails);

        // Assertions
        verify(plannedExpenseRepository).deleteByIdAndUsername(id, userDetails.getUsername());
    }

    @Test
    public void testDeleteUserPlannedExpenseById_NullUserDetails() {
        assertThrows(IllegalArgumentException.class, () -> plannedExpenseService.deleteUserPlannedExpenseById(1L, null));
    }

    @Test
    public void testUpdateUserPlannedExpense_Success() {
        // Mock data
        PlannedExpenseRequest request = createMockPlannedExpenseRequest();
        PlannedExpense updatedExpense = createMockPlannedExpense(); // Expected updated expense

        // Mock behavior
        when(plannedExpenseMapper.toPlannedExpense(request)).thenReturn(updatedExpense);
        when(plannedExpenseRepository.save(updatedExpense)).thenReturn(updatedExpense);

        // Call the method
        plannedExpenseService.updateUserPlannedExpense(1L, request, userDetails);

        // Assertions
        verify(plannedExpenseMapper).toPlannedExpense(request);
        verify(plannedExpenseRepository).save(updatedExpense);
    }
    @Test
    public void testUpdateUserPlannedExpense_NullUserDetails() {
        assertThrows(IllegalArgumentException.class, () -> plannedExpenseService.updateUserPlannedExpense(1L, null,null));
    }
    private PlannedExpenseRequest createMockPlannedExpenseRequest() {
        return  new PlannedExpenseRequest(
                1L,
                "holidays",
                300.0,
                "2024-02-02",
                Status.PAID,
                2,
                "Super holidays",
                PaymentMethod.BANK_TRANSFER);
    }
    private PlannedExpense createMockPlannedExpense() {
        return new PlannedExpense(
                1L,
                "holidays",
                300.0,
                "2024-02-02",
                Status.PAID,
                2,
                "Super holidays",
                PaymentMethod.BANK_TRANSFER,
                userDetails.getUsername());
    }
    private PlannedExpense createMockPlannedExpense(Long id) {

        return new PlannedExpense(id, "holiday", 300.0, "2024-02-02", Status.PAID, 2, "Super holiday", PaymentMethod.BANK_TRANSFER, userDetails.getUsername());
    }
    private PlannedExpenseResponse createMockPlannedExpenseResponse(PlannedExpense plannedExpense) {

        return new PlannedExpenseResponse(plannedExpense.getId(),plannedExpense.getCategory(), plannedExpense.getAmount(),plannedExpense.getPaymentDate(),plannedExpense.getStatus(),plannedExpense.getPriority(),plannedExpense.getDescription(),plannedExpense.getPaymentMethod());
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
        for (PlannedExpense plannedExpense : plannedExpenses) {
            plannedExpenseResponses.add(new PlannedExpenseResponse(plannedExpense.getId(), plannedExpense.getUsername(), plannedExpense.getAmount(), plannedExpense.getPaymentDate(), plannedExpense.getStatus(), plannedExpense.getPriority(), plannedExpense.getDescription(), plannedExpense.getPaymentMethod()));
        }

        return plannedExpenseResponses;
    }
}