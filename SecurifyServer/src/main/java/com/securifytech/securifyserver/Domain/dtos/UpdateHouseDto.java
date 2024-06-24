package com.securifytech.securifyserver.Domain.dtos;

import lombok.Data;

import java.util.UUID;

@Data
public class UpdateHouseDto {
    private int numberOfResidents;
    private UUID residentID;
}
