package pl.savings.wealthvoyage.entity;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegistrationDTO {
    private String username;
    private String password;

    public String toString(){
        return "Registration info: username: " + this.username + " password: " + this.password;
    }
}
