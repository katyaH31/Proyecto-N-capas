package com.securifytech.securifyserver.Domain.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Data
@Entity
@Table(name = "securify_users")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "user_id")
    private UUID id;

    private String username;
    private String email;
    private String DUI;
    private Boolean active;

    //de aqui vamos con las relaciones

    //usario con visita 1 - N
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<Visit> visits;

    //usuario con visita anonima 1 - N
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<AnonymousVisit> anonymousVisits;

    //usuario con casas N - N
    @ManyToMany
    @JoinTable(
            name = "user_houses",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "house_id")
    )
    private List<House> houses;

    //usuario con roles N - N
    @JsonIgnore
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private List<Role> roles;

    //relacion user con token 1 - N
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Token> tokens;

    //Relacion con permisos 1 - N
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Permission> permissions;


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles.stream()
                .map(role -> new SimpleGrantedAuthority(role.getName()))
                .collect(Collectors.toList());
    }

    @Override
    public String getPassword() {
        return null;
    }
}
