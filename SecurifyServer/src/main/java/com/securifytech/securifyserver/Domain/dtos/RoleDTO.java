package com.securifytech.securifyserver.Domain.dtos;

import com.securifytech.securifyserver.Domain.entities.Token;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoleDTO {

    private String username;
    private String role;


}
