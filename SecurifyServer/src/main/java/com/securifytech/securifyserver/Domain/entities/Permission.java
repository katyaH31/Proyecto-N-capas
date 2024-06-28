package com.securifytech.securifyserver.Domain.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.securifytech.securifyserver.Enums.RequestState;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
@Entity
@Table(name = "securify_permissions")
public class Permission {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "permission_id")
    private UUID id;

    private String description;

    private Date requestedDated;

    private Date makeDate;

    @Enumerated(EnumType.STRING)
    private RequestState status;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    private House house;

    //Relacion con usuario  N - 1
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

}
