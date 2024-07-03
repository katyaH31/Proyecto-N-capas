package com.securifytech.securifyserver.Services.implementations;

import com.securifytech.securifyserver.Domain.entities.House;
import com.securifytech.securifyserver.Domain.entities.User;
import com.securifytech.securifyserver.Domain.entities.Visit;
import com.securifytech.securifyserver.Repositories.VisitRepository;
import com.securifytech.securifyserver.Services.VisitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Date;
import java.util.List;

@Service
public class VisitServiceImpl implements VisitService {

    @Autowired
    VisitRepository visitRepository;

    @Override
    public void createVisit(User user, House house, String description) {
        Visit visit = new Visit();

        visit.setVisitDate(Date.from(Instant.now()));
        visit.setUser(user);
        visit.setHouse(house);
        visit.setDescription(description);

        visitRepository.save(visit);
    }

    @Override
    public List<Visit> getAllVisits() {
        return visitRepository.findAll();
    }

    @Override
    public List<Visit> getByUser(User user) {
        return visitRepository.findByUser(user);
    }

    @Override
    public List<Visit> getByHouse(House house) {
        return visitRepository.findByHouse(house);
    }


}
