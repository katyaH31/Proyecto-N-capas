package com.securifytech.securifyserver.Services.implementations;

import com.securifytech.securifyserver.Domain.dtos.PermissionDTO;
import com.securifytech.securifyserver.Domain.entities.House;
import com.securifytech.securifyserver.Domain.entities.Permission;
import com.securifytech.securifyserver.Domain.entities.User;
import com.securifytech.securifyserver.Enums.RequestState;
import com.securifytech.securifyserver.Repositories.HouseRepository;
import com.securifytech.securifyserver.Repositories.PermissionRepository;
import com.securifytech.securifyserver.Repositories.UserRepository;
import com.securifytech.securifyserver.Services.PermissionService;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
public class PermissionServiceImpl implements PermissionService {

    private final PermissionRepository permissionRepository;

    private final UserRepository userRepository;


    public PermissionServiceImpl(PermissionRepository permissionRepository, UserRepository userRepository, HouseRepository houseRepository) {
        this.permissionRepository = permissionRepository;
        this.userRepository = userRepository;
    }

    @Override
    public void CreatePermission(PermissionDTO info, User user, House house) {
        Permission permission = new Permission();

        permission.setMakeDate(Date.from(Instant.now()));
        permission.setRequestedDated(info.getRequestedDate());
        permission.setStatus(RequestState.PENDING);
        permission.setDescription(info.getDescription());
        permission.setHouse(house);
        permission.setUser(user);

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
    public List<Permission> GetPermissionsByUser(User user) {
        return permissionRepository.findByUser(user);
    }
}
