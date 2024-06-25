package com.securifytech.securifyserver.Services;

import com.securifytech.securifyserver.Domain.dtos.CreateAnonymousVisitDto;
import com.securifytech.securifyserver.Domain.entities.AnonymousVisit;
import com.securifytech.securifyserver.Domain.entities.User;

public interface AnonymousVisitService {
    void createAnonymousVisit(CreateAnonymousVisitDto visitDto, User user);
}
