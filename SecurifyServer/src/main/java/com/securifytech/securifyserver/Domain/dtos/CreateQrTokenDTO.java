package com.securifytech.securifyserver.Domain.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateQrTokenDTO {

    @NotBlank
    private String username;

    private UUID permissionId;
}
