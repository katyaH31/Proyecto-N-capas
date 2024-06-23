package com.securifytech.securifyserver.Domain.dtos;


import lombok.Data;

import java.util.UUID;

@Data
public class CreateHouseDto {
    private String houseId;
    private String polygon;
    private int numberOfResidents;
    private UUID residentId;
}
