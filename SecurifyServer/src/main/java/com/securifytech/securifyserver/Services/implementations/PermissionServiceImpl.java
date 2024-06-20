package com.securifytech.securifyserver.Services.implementations;

import com.securifytech.securifyserver.Domain.dtos.PermissionDTO;
import com.securifytech.securifyserver.Domain.entities.Permission;
import com.securifytech.securifyserver.Domain.entities.User;
import com.securifytech.securifyserver.Enums.RequestState;
import com.securifytech.securifyserver.Repositories.PermissionRepository;
import com.securifytech.securifyserver.Repositories.UserRepository;
import com.securifytech.securifyserver.Services.PermissionService;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Date;

@Service
public class PermissionServiceImpl implements PermissionService {

    private final PermissionRepository permissionRepository;

    private final UserRepository userRepository;

    public PermissionServiceImpl(PermissionRepository permissionRepository, UserRepository userRepository) {
        this.permissionRepository = permissionRepository;
        this.userRepository = userRepository;
    }

    @Override
    public void CreatePermission(PermissionDTO info, User user) {
        Permission permission = new Permission();

        permission.setMakeDate(Date.from(Instant.now()));
        permission.setRequestedDated(info.getRequestedDate());
        permission.setStatus(RequestState.PENDING);
        permission.setDescription(info.getDescription());
        permission.setUser(user);

        permissionRepository.save(permission);
    }
}
