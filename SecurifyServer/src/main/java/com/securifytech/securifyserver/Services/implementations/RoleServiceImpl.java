package com.securifytech.securifyserver.Services.implementations;

import com.securifytech.securifyserver.Domain.entities.Role;
import com.securifytech.securifyserver.Repositories.RoleRepository;
import com.securifytech.securifyserver.Services.RoleService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;

    public RoleServiceImpl(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public Optional<Role> findByName(String role) {
        return roleRepository.findByName(role);
    }
}
