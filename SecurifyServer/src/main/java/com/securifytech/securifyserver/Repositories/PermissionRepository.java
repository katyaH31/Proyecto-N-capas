package com.securifytech.securifyserver.Repositories;

import com.securifytech.securifyserver.Domain.entities.House;
import com.securifytech.securifyserver.Domain.entities.Permission;
import com.securifytech.securifyserver.Domain.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface PermissionRepository extends JpaRepository<Permission, UUID> {

    List<Permission> findByHouse(House house);

    List<Permission> findByUser(User user);

}
