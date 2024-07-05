package com.securifytech.securifyserver.Services.implementations;

import com.securifytech.securifyserver.Domain.dtos.PermissionDTO;
import com.securifytech.securifyserver.Domain.entities.House;
import com.securifytech.securifyserver.Domain.entities.Permission;
import com.securifytech.securifyserver.Domain.entities.User;
import com.securifytech.securifyserver.Enums.RequestState;
import com.securifytech.securifyserver.Repositories.PermissionRepository;
import com.securifytech.securifyserver.Services.PermissionService;
import com.securifytech.securifyserver.Services.UserService;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
public class PermissionServiceImpl implements PermissionService {

    private final PermissionRepository permissionRepository;

    private final UserService userService;



    public PermissionServiceImpl(PermissionRepository permissionRepository, UserService userService) {
        this.permissionRepository = permissionRepository;
        this.userService = userService;
    }

    @Override
    public void CreatePermission(PermissionDTO info, User visitor, House house) {
        Permission permission = new Permission();
        User creator = userService.findUserAuthenticated();

        LocalDate localDate = info.getRequestedDate();

        if (localDate.isBefore(LocalDate.now())) {
            throw new RuntimeException("Invalid requested date");
        }

        permission.setMakeDate(Date.from(Instant.now()));
        permission.setRequestedDated(localDate);
        permission.setStatus(RequestState.PENDING);
        permission.setDescription(info.getDescription());
        permission.setHouse(house);
        permission.setVisitor(visitor);
        permission.setCreator(creator);

        permissionRepository.save(permission);
    }

    @Override
    public List<Permission> GetPermissionsByHouse(House house) {
        return permissionRepository.findByHouse(house);
    }

    @Override
    public Permission findById(UUID idPermission) {
        return permissionRepository.findById(idPermission).orElse(null);
    }

    @Override
    public void ChangePermissionStatus(Permission permission, RequestState state) {
            permission.setStatus(state);
            permissionRepository.save(permission);
    }

    @Override
    public List<Permission> GetPermissionsByVisitor(User visitor) {
        return permissionRepository.findByVisitor(visitor);
    }

    @Override
    public List<Permission> GetPermissionsByCreator(User creator) {
        return permissionRepository.findByCreator(creator);
    }
}
