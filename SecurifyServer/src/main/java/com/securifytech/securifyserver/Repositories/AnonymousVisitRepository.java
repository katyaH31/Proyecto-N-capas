package com.securifytech.securifyserver.Repositories;

import com.securifytech.securifyserver.Domain.entities.AnonymousVisit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface AnonymousVisitRepository extends JpaRepository<AnonymousVisit, UUID> {

}
