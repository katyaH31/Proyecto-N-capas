package com.securifytech.securifyserver.Services;

import com.securifytech.securifyserver.Domain.dtos.CreateHouseDto;
import com.securifytech.securifyserver.Domain.dtos.UpdateHouseDto;
import com.securifytech.securifyserver.Domain.entities.House;
import com.securifytech.securifyserver.Domain.entities.User;
import com.securifytech.securifyserver.Domain.entities.Visit;

import java.util.List;

public interface HouseService {

    House findById(String idHouse);

    void createHouse(CreateHouseDto houseDto);

    void updateHouse(String houseId, UpdateHouseDto houseDto);

    List<House> getAllHouses();

    List<Visit> getVisitHistory(String houseId);

    List<User> getResidents(String houseId);
}
