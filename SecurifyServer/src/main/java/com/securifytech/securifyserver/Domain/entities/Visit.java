package com.securifytech.securifyserver.Domain.entities;


import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
@Entity
@Table(name = "securify_visits")
public class Visit {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private Date visitDate;

    private String description;

    //Todas son relaciones 1 - N

    //id de tipo de entrada
    @ManyToOne(fetch = FetchType.EAGER)
    private EntryType entryType;

    //id de la casa a visitar
    @ManyToOne(fetch = FetchType.EAGER)
    private House house;

    //id del usuario que hizo la visita
    @ManyToOne(fetch = FetchType.EAGER)
    private User user;



}
