package com.securifytech.securifyserver.Domain.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class PermissionDTO {

    @NotBlank
    private String username;

    @NotBlank
    private String description;

    private LocalDate requestedDate;
}
