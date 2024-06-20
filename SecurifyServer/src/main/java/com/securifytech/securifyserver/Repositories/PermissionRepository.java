package com.securifytech.securifyserver.Repositories;

import com.securifytech.securifyserver.Domain.entities.Permission;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PermissionRepository extends JpaRepository<Permission, UUID> {
}
