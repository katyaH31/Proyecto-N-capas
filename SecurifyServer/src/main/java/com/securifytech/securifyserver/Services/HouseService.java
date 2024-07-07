package com.securifytech.securifyserver.Services;

import com.securifytech.securifyserver.Domain.dtos.CreateHouseDto;
import com.securifytech.securifyserver.Domain.dtos.ResidentHouseDto;
import com.securifytech.securifyserver.Domain.dtos.UpdateHouseDto;
import com.securifytech.securifyserver.Domain.entities.House;
import com.securifytech.securifyserver.Domain.entities.User;
import com.securifytech.securifyserver.Domain.entities.Visit;

import java.util.List;
import java.util.UUID;

public interface HouseService {

    House findById(String idHouse);

    void ChangeHouseManager(House house, User newManager);

    void createHouse(CreateHouseDto houseDto);

    void updateHouse(String houseId, UpdateHouseDto houseDto);

    List<House> getAllHouses();

    List<Visit> getVisitHistory(String houseId);

    List<User> getResidents(String houseId);

    void updateHome(String username, House house);
}
