package com.securifytech.securifyserver.Domain.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
@Entity
@Table(name = "securify_roles")
public class Rol {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "role_id")
    private UUID id;

    private String name;

    //relacion N - N con usuario

    @ManyToMany(mappedBy = "roles")
    private List<User> users;

}
