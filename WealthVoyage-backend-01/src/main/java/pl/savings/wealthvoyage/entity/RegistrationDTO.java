package pl.savings.wealthvoyage.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class RegistrationDTO {
    private String userName;
    private String password;
}
