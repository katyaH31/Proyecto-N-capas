package com.securifytech.securifyserver.Services;

import com.securifytech.securifyserver.Domain.entities.House;
import com.securifytech.securifyserver.Domain.entities.User;
import com.securifytech.securifyserver.Domain.entities.Visit;

import java.util.List;

public interface VisitService {

    void createVisit(User user, House house, String description);

    List<Visit> getAllVisits();

    List<Visit> getByUser(User user);

    List<Visit> getByHouse(House house);
}
