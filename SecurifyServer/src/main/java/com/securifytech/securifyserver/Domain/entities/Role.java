package com.securifytech.securifyserver.Domain.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "securify_roles")
public class Role {

    @Id
    @Column(name = "role_id")
    private String id;

    private String name;

    //relacion N - N con usuario

    @ManyToMany(mappedBy = "roles")
    private List<User> users;

}
