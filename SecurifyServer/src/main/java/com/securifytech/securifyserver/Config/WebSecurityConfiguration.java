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
                    //Guard
                    .requestMatchers("/api/anonymous/create").hasAuthority("Guard")
                    .requestMatchers("/api/anonymous/all").hasAnyAuthority("Guard", "Admin")
                    .requestMatchers("/api/qr/validate").hasAuthority("Guard")

                    //Admin
                    .requestMatchers("/api/house/changeManager").hasAuthority("Admin")
                    .requestMatchers("/api/house").hasAuthority("Admin")
                    .requestMatchers("/api/house/all").hasAuthority("Admin")
                    .requestMatchers("/api/user/roles").hasAuthority("Admin")
                    .requestMatchers("/api/user").hasAuthority("Admin")
                    .requestMatchers("/api/user/allna").hasAuthority("Admin")
                    .requestMatchers("/api/user/guards").hasAuthority("Admin")
                    .requestMatchers("/api/visits/all").hasAnyAuthority("Admin", "Manager")
                    .requestMatchers("/api/user/assignGuard").hasAuthority("Admin")

                    //Manager
                    .requestMatchers("/api/house/history/visits/{houseId}").hasAuthority("Manager")
                    .requestMatchers("/api/house/residents/{houseId}").hasAuthority("Manager")
                    .requestMatchers("/api/house/residenthouse").hasAuthority("Manager")
                    .requestMatchers("/api/house/residents-manager").hasAuthority("Manager")
                    .requestMatchers("/api/permission/").hasAuthority("Manager")
                    .requestMatchers("/api/permission/User").hasAuthority("Manager")
                    .requestMatchers("/api/permission/changeStatus").hasAuthority("Manager")
                    .requestMatchers("/api/permission/house").hasAuthority("Manager")
                    .requestMatchers("/api/visits/house").hasAuthority("Manager")

                    //resident
                    .requestMatchers("/api/permission/create").hasAuthority("Resident")
                    .requestMatchers("/api/qr/create").hasAnyAuthority("Resident", "Manager")

                    //Visitor
                    .requestMatchers("/api/permission/visitors").hasAuthority("Visitor")
                    .requestMatchers("/api/qr/create-visitor").hasAuthority("Visitor")

                    //Auth
                    .requestMatchers("api/auth/google").permitAll()
                    .requestMatchers("api/auth/me").hasAnyAuthority("Guard", "Admin", "Manager", "Resident", "Visitor")
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
