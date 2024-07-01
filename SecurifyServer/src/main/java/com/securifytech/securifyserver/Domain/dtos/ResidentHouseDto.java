package com.securifytech.securifyserver.Domain.dtos;

import lombok.Data;

import java.util.UUID;

@Data
public class ResidentHouseDto {

    private String houseId;

    private UUID residentId;
}
