package com.securifytech.securifyserver.Services;

import com.securifytech.securifyserver.Domain.dtos.PermissionDTO;
import com.securifytech.securifyserver.Domain.entities.House;
import com.securifytech.securifyserver.Domain.entities.Permission;
import com.securifytech.securifyserver.Domain.entities.User;

import java.util.List;
import java.util.UUID;

public interface PermissionService {

    void CreatePermission(PermissionDTO permissionDTO, User user, House house);

    List<Permission> GetPermissionsByHouse(House house);

    Permission findById(UUID idPermission);

}
