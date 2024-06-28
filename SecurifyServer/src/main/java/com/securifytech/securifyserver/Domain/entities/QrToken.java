package com.securifytech.securifyserver.Domain.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.time.Instant;
import java.util.Date;
import java.util.UUID;

@Data
@Entity
@Table(name = "securify_qr_token")
public class QrToken {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "code")
    private UUID code;

    private String content;

    private Date timestamp;

    private Boolean active;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "permisssion_id")
    @JsonIgnore
    private Permission permission;
    public QrToken(String content, User user, Permission permission) {
        super();
        this.content = content;
        this.user = user;
        this.permission = permission;
        this.timestamp = Date.from(Instant.now());
        this.active = true;
    }

    public QrToken() {

    }
}
