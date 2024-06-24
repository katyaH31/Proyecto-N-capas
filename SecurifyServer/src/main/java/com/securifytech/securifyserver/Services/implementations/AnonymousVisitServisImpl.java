package com.securifytech.securifyserver.Services.implementations;

import com.securifytech.securifyserver.Domain.dtos.CreateAnonymousVisitDto;
import com.securifytech.securifyserver.Domain.entities.AnonymousVisit;
import com.securifytech.securifyserver.Domain.entities.User;
import com.securifytech.securifyserver.Repositories.AnonymousVisitRepository;
import com.securifytech.securifyserver.Services.AnonymousVisitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AnonymousVisitServisImpl implements AnonymousVisitService {

    @Autowired
    private AnonymousVisitRepository anonymousVisitRepository;

    @Override
    public void createAnonymousVisit(CreateAnonymousVisitDto visitDto, User user) {
        AnonymousVisit anonymousVisit = new AnonymousVisit();
        anonymousVisit.setName(visitDto.getName());
        anonymousVisit.setDescription(visitDto.getDescription());
        anonymousVisit.setUser(user);
        anonymousVisitRepository.save(anonymousVisit);
    }
}
