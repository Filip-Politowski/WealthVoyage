package pl.savings.wealthvoyage.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {
    private String username;
    private String firstName;
    private String lastName;
    private String email;
}
