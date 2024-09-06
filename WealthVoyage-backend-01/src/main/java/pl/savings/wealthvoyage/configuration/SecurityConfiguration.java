package pl.savings.wealthvoyage.configuration;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


import org.springframework.security.authentication.AuthenticationProvider;

import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

import static org.springframework.http.HttpMethod.*;
import static pl.savings.wealthvoyage.user.Permission.*;
import static pl.savings.wealthvoyage.user.Role.ADMIN;
import static pl.savings.wealthvoyage.user.Role.USER;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;
    private final LogoutHandler logoutHandler;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(Customizer.withDefaults())
                .authorizeHttpRequests(auth -> {
                    auth.requestMatchers("/api/auth/**").permitAll();

                    auth.requestMatchers("/api/user/**").hasAnyRole(ADMIN.name(), USER.name());

                    auth.requestMatchers(GET, "/api/user/**").hasAnyAuthority(ADMIN_READ.name(), USER_READ.name());
                    auth.requestMatchers(POST, "/api/user/**").hasAnyAuthority(ADMIN_CREATE.name(), USER_CREATE.name());
                    auth.requestMatchers(PUT, "/api/user/**").hasAnyAuthority(ADMIN_UPDATE.name(), USER_UPDATE.name());
                    auth.requestMatchers(DELETE, "/api/user/**").hasAnyAuthority(ADMIN_DELETE.name(), USER_DELETE.name());

                    auth.requestMatchers("/api/admin/**").hasRole(ADMIN.name());

                    auth.requestMatchers(GET, "/api/admin/**").hasAuthority(ADMIN_READ.name());
                    auth.requestMatchers(POST, "/api/admin/**").hasAuthority(ADMIN_CREATE.name());
                    auth.requestMatchers(PUT, "/api/admin/**").hasAuthority(ADMIN_UPDATE.name());
                    auth.requestMatchers(DELETE, "/api/admin/**").hasAuthority(ADMIN_DELETE.name());

                    auth.anyRequest().authenticated();
                })
                .sessionManagement(session -> session.sessionCreationPolicy(org.springframework.security.config.http.SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .logout((logout) ->
                        logout
                                .logoutUrl("/api/auth/logout")
                                .addLogoutHandler(logoutHandler)
                                .logoutSuccessHandler(((request, response, authentication) ->
                                        SecurityContextHolder.clearContext()))
                )
                .build();


    }


}
