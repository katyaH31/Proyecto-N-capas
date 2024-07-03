package com.securifytech.securifyserver.Services;

import com.securifytech.securifyserver.Domain.dtos.PermissionDTO;
import com.securifytech.securifyserver.Domain.entities.House;
import com.securifytech.securifyserver.Domain.entities.Permission;
import com.securifytech.securifyserver.Domain.entities.User;
import com.securifytech.securifyserver.Enums.RequestState;

import java.util.List;
import java.util.UUID;

public interface PermissionService {

    void CreatePermission(PermissionDTO permissionDTO, User user, House house);

    List<Permission> GetPermissionsByHouse(House house);

    Permission findById(UUID idPermission);

    void ChangePermissionStatus(Permission permission, RequestState state);

    List<Permission> GetPermissionsByVisitor(User visitor);
    List<Permission> GetPermissionsByCreator(User creator);

}
