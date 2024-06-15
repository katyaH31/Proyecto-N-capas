package com.securifytech.securifyserver.Domain.dtos;

import com.securifytech.securifyserver.Domain.entities.Token;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RoleDTO {

    private String role;

    public RoleDTO(Token token) {
        this.role = token.getContent();
    }

}
