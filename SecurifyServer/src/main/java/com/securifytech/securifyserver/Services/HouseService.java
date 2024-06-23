package com.securifytech.securifyserver.Services;

import com.securifytech.securifyserver.Domain.entities.House;
import com.securifytech.securifyserver.Domain.entities.User;

public interface HouseService {

    House findById(String idHouse);

    void ChangeHouseManager(House house, User newManager);
}
