package pl.savings.wealthvoyage.entity;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegistrationDTO {
    private String username;
    private String password;
    private String email;
    private String firstName;
    private String lastName;

    public String toString(){
        return "Registration info: username: " + this.username + " password: " + this.password;
    }
}
