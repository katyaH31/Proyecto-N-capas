package com.securifytech.securifyserver.Domain.entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "securify_houses")
public class House {
    @Id
    @Column(name = "house_id")
    private String id;

    private String polygon;

    private int numberOfResidents;

    // casa con visitas 1 - N
    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "house")
    private List<Visit> visits;

    @JsonIgnore
    @OneToMany(mappedBy = "house", fetch = FetchType.LAZY)
    private List<Permission> permissions;

    // N: N
    @JsonIgnore
    @ManyToMany(mappedBy = "houses")
    private List<User> users;

}
