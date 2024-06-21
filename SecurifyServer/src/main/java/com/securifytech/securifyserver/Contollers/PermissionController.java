package com.securifytech.securifyserver.Contollers;


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

import java.util.List;

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
        House house = houseService.findById(info.getHouseId());

        if (user == null) {
            return GeneralResponse.builder()
                    .status(HttpStatus.NOT_FOUND)
                    .message("User not found")
                    .getResponse();
        }

        if (house == null) {
            return GeneralResponse.builder()
                    .status(HttpStatus.NOT_FOUND)
                    .message("House not Found")
                    .getResponse();
        }

        try {
            permissionService.CreatePermission(info, user, house);

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

        if (house == null) {
            return GeneralResponse.builder()
                    .status(HttpStatus.NOT_FOUND)
                    .message("House does no exist")
                    .getResponse();
        }

        try {
            List<Permission> permissions = permissionService.GetPermissionsByHouse(house);

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

    @GetMapping("/inCharge")
    public ResponseEntity<GeneralResponse> getPermissionsByManager() {
        User user = userService.findUserAuthenticated();

        if (user == null) {
            return GeneralResponse.builder()
                    .status(HttpStatus.NOT_FOUND)
                    .message("User does not exist")
                    .getResponse();
        }

        try {
            List<Permission> permissions = permissionService.GetPermissionsByHouse(user.getHouses().get(0));

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
}
