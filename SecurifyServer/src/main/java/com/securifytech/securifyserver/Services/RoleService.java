package com.securifytech.securifyserver.Services;

import com.securifytech.securifyserver.Domain.dtos.RoleDTO;
import com.securifytech.securifyserver.Domain.entities.Role;

import java.util.Optional;

public interface RoleService {

    Optional<Role> findByName(String role);

    void ChangeRole(RoleDTO roleDTO);
}
