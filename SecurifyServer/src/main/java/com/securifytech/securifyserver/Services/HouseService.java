package com.securifytech.securifyserver.Services;

import com.securifytech.securifyserver.Domain.dtos.CreateHouseDto;
import com.securifytech.securifyserver.Domain.entities.House;

public interface HouseService {

    House findById(String idHouse);

    void createHouse(CreateHouseDto houseDto);
}
