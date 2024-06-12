package com.securifytech.securifyserver.Domain.entities;


import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "securify_anonymousvisits")
public class AnonymousVisit {

    @Id
    private String id;

    private String name;
    private String description;

    //user(Vigilante) al generar visitas anonimas 1 - N

    @ManyToOne(fetch = FetchType.EAGER)
    private User user;

}
