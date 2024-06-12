package com.securifytech.securifyserver.Domain.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
@Entity
@Table(name = "token")
public class Token {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "code")
    private UUID code;

    private String content;

    private Date timestamp;

    private Boolean active;


    //relacion token usuario N - 1
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;


}
