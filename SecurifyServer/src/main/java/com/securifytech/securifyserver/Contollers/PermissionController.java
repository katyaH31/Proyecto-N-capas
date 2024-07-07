package com.securifytech.securifyserver.Contollers;


import com.securifytech.securifyserver.Domain.dtos.ChangeStateDTO;
import com.securifytech.securifyserver.Domain.dtos.GeneralResponse;
import com.securifytech.securifyserver.Domain.dtos.PermissionDTO;
import com.securifytech.securifyserver.Domain.entities.House;
import com.securifytech.securifyserver.Domain.entities.Permission;
import com.securifytech.securifyserver.Domain.entities.User;
import com.securifytech.securifyserver.Services.HouseService;
import com.securifytech.securifyserver.Services.PermissionService;
import com.securifytech.securifyserver.Services.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/permission")
public class PermissionController {

    private final UserService userService;

    private final PermissionService permissionService;

    private final HouseService houseService;

    public PermissionController(UserService userService, PermissionService permissionService, HouseService houseService) {
        this.userService = userService;
        this.permissionService = permissionService;
        this.houseService = houseService;
    }

    @PostMapping("/create")
    public ResponseEntity<GeneralResponse> createPermission(@RequestBody @Valid PermissionDTO info) {
        User user = userService.findByUsernameOrEmail(info.getUsername(), info.getUsername());
        User resident = userService.findUserAuthenticated();
        House house = resident.getHouse();

        if(house == null){
            return GeneralResponse.builder()
                    .status(HttpStatus.NOT_FOUND)
                    .message("User must have a house asigned")
                    .getResponse();
        }

        if (user == null) {
            return GeneralResponse.builder()
                    .status(HttpStatus.NOT_FOUND)
                    .message("User not found")
                    .getResponse();
        }


        try {
            permissionService.CreatePermission(info,user,resident.getHouse());

            return GeneralResponse.builder()
                    .status(HttpStatus.CREATED)
                    .message("Request created successfully")
                    .getResponse();
        } catch (Exception e) {
            e.printStackTrace();
            return GeneralResponse.builder()
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .getResponse();
        }
    }

    @GetMapping("/house")
    public ResponseEntity<GeneralResponse> getPermissionsByHouse(@RequestParam String idHouse) {
        House house = houseService.findById(idHouse);
        List<Permission> emptyList = Collections.emptyList();

        if (house == null) {
            return GeneralResponse.builder()
                    .status(HttpStatus.NOT_FOUND)
                    .message("House does no exist")
                    .getResponse();
        }

        try {
            List<Permission> permissions = permissionService.GetPermissionsByHouse(house);

            if (permissions == null) {
                return GeneralResponse.builder()
                        .status(HttpStatus.OK)
                        .message("Permissions found")
                        .data(emptyList)
                        .getResponse();
            }

            return GeneralResponse.builder()
                    .status(HttpStatus.OK)
                    .message("Permissions found")
                    .data(permissions)
                    .getResponse();
        } catch (Exception e) {
            e.printStackTrace();
            return GeneralResponse.builder()
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .getResponse();
        }
    }

    @GetMapping("/User")
    public ResponseEntity<GeneralResponse> getPermissionsByCreator() {
        User user = userService.findUserAuthenticated();
        List<Permission> emptyList = Collections.emptyList();

        if (user == null) {
            return GeneralResponse.builder()
                    .status(HttpStatus.NOT_FOUND)
                    .message("User does not exist")
                    .getResponse();
        }

        try {
             List<Permission> permissions = permissionService.GetPermissionsByCreator(user);

             if (permissions == null) {
                 return GeneralResponse.builder()
                         .status(HttpStatus.OK)
                         .message("Permissions found")
                         .data(emptyList)
                         .getResponse();
             }

            return GeneralResponse.builder()
                    .status(HttpStatus.OK)
                    .message("Permissions found")
                    .data(permissions)
                    .getResponse();
        } catch (Exception e) {
            e.printStackTrace();
            return GeneralResponse.builder()
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .getResponse();
        }
    }

    @PutMapping("/changeStatus")
    public ResponseEntity<GeneralResponse> changeStatusById(@RequestBody @Valid ChangeStateDTO changeStateDTO, @RequestParam UUID idPermission) {
        Permission permission = permissionService.findById(idPermission);

        if (permission == null) {
            return GeneralResponse.builder()
                    .status(HttpStatus.NOT_FOUND)
                    .message("Permission not found")
                    .getResponse();
        }

        try {
            permissionService.ChangePermissionStatus(permission, changeStateDTO.getState());

            return GeneralResponse.builder()
                    .status(HttpStatus.OK)
                    .message("status changed")
                    .getResponse();
        } catch (Exception e) {
            e.printStackTrace();
            return GeneralResponse.builder()
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .getResponse();
        }
    }

    @GetMapping("/visitors")
    public ResponseEntity<GeneralResponse> getPermissionsByVisitor() {
        User user = userService.findUserAuthenticated();
        List<Permission> emptyList = Collections.emptyList();
        if (user == null) {
            return GeneralResponse.builder()
                    .status(HttpStatus.NOT_FOUND)
                    .message("User not found")
                    .getResponse();
        }

        try {
            List<Permission> permissions = permissionService.GetPermissionsByVisitor(user);
            if (permissions == null) {
                return GeneralResponse.builder()
                        .status(HttpStatus.OK)
                        .message("Permissions found:")
                        .data(emptyList)
                        .getResponse();
            }
            return GeneralResponse.builder()
                    .status(HttpStatus.OK)
                    .message("Permissions found:")
                    .data(permissions)
                    .getResponse();
        } catch (Exception e) {
            e.printStackTrace();
            return GeneralResponse.builder()
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .getResponse();
        }
    }
}
