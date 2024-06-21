package com.securifytech.securifyserver.Repositories;

import com.securifytech.securifyserver.Domain.entities.House;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface HouseRepository extends JpaRepository<House, String> {

    List<House> findByIdAndBlock(String id, String block);
}
