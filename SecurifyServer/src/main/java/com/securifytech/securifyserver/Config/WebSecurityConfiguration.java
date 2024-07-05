package com.securifytech.securifyserver.Config;

import com.securifytech.securifyserver.Domain.entities.User;
import com.securifytech.securifyserver.Services.UserService;
import com.securifytech.securifyserver.Utils.JWTTokenFilter;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class WebSecurityConfiguration {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JWTTokenFilter filter;

    @Bean
    AuthenticationManager authenticationManagerBean(HttpSecurity http) throws Exception {
        AuthenticationManagerBuilder managerBuilder
                = http.getSharedObject(AuthenticationManagerBuilder.class);

        managerBuilder
                .userDetailsService(identifier -> {
                    User user = userService.findByIdentifier(identifier);

                    if (user == null)
                        throw new UsernameNotFoundException("User: " + identifier + " not found!");

                    return user;
                })
                .passwordEncoder(passwordEncoder);

        return managerBuilder.build();
    }

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.httpBasic(withDefaults()).csrf(AbstractHttpConfigurer::disable);
        http.cors(withDefaults());

        http.authorizeHttpRequests(auth ->
            auth
                    .requestMatchers("/api/auth/**").permitAll()
                    .requestMatchers("/api/permission/**").permitAll()
                    .requestMatchers("api/user/**").permitAll()
                    .requestMatchers("/api/house/**").permitAll()
                    .requestMatchers("/api/visits/**").permitAll()
                    .requestMatchers("/api/qr/**").permitAll()
                    .requestMatchers("/api/anonymous/**").permitAll()

        );
        http.sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        http.exceptionHandling(handling -> handling.authenticationEntryPoint((req, res, ex) ->  {
            res.sendError(
                    HttpServletResponse.SC_UNAUTHORIZED,
                    "Auth fail!"
            );
        }));

        http.addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:5173")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }
}
