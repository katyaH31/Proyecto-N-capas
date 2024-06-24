package com.securifytech.securifyserver.Repositories;

import com.securifytech.securifyserver.Domain.entities.Visit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface VisitRepository extends JpaRepository<Visit, UUID> {
    List<Visit> findByHouseId(String houseId);
}
