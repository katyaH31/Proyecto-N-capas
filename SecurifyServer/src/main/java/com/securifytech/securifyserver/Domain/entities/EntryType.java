package com.securifytech.securifyserver.Domain.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "securify_entrytype")
public class EntryType {
    //Este es un catalogo
    @Id
    @Column(name = "entrytype_code")
    private String code;
    private String entrytype;

    //conexion con Visit 1 - N
    @OneToMany(mappedBy = "entryType", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Visit> visits;
}
