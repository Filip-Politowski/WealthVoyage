package pl.savings.wealthvoyage.service;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.savings.wealthvoyage.entity.Role;
import pl.savings.wealthvoyage.entity.User;

import java.util.HashSet;
import java.util.Set;

@Service
@Data
@AllArgsConstructor
public class UserService implements UserDetailsService {
    private final PasswordEncoder encoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        System.out.println("In the user details service");

        if (!username.equals("Filip")) throw new UsernameNotFoundException("Not Filip");
        Set<Role> roles = new HashSet<>();
        roles.add(new Role(1, "USER"));

        return new User(1, "Filip", encoder.encode("password"), roles);
    }
}
