package com.securifytech.securifyserver.Services;

import com.securifytech.securifyserver.Domain.dtos.PermissionDTO;
import com.securifytech.securifyserver.Domain.entities.User;

public interface PermissionService {

    void CreatePermission(PermissionDTO permissionDTO, User user);

}
