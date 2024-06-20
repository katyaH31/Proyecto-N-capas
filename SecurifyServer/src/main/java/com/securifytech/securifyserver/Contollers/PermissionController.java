package com.securifytech.securifyserver.Contollers;


import com.securifytech.securifyserver.Domain.dtos.GeneralResponse;
import com.securifytech.securifyserver.Domain.dtos.PermissionDTO;
import com.securifytech.securifyserver.Domain.entities.User;
import com.securifytech.securifyserver.Services.PermissionService;
import com.securifytech.securifyserver.Services.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/permission")
public class PermissionController {

    private final UserService userService;

    private final PermissionService permissionService;

    public PermissionController(UserService userService, PermissionService permissionService) {
        this.userService = userService;
        this.permissionService = permissionService;
    }

    @PostMapping("/create")
    public ResponseEntity<GeneralResponse> createPermission(@RequestBody @Valid PermissionDTO info) {
        User user = userService.findByUsernameOrEmail(info.getUsername(), info.getUsername());

        if (user == null) {
            return GeneralResponse.builder()
                    .status(HttpStatus.NOT_FOUND)
                    .message("User not found")
                    .getResponse();
        }

        try {
            permissionService.CreatePermission(info, user);

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

}
