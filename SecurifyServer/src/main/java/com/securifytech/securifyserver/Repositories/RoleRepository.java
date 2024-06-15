package com.securifytech.securifyserver.Repositories;

import com.securifytech.securifyserver.Domain.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, String> {

    Optional<Role> findByName(String role);

}
