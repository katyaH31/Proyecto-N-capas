package com.securifytech.securifyserver.Contollers;

import com.securifytech.securifyserver.Domain.dtos.CreateUserDTO;
import com.securifytech.securifyserver.Domain.dtos.GeneralResponse;
import com.securifytech.securifyserver.Domain.dtos.RoleDTO;
import com.securifytech.securifyserver.Domain.entities.Role;
import com.securifytech.securifyserver.Domain.entities.User;
import com.securifytech.securifyserver.Services.RoleService;
import com.securifytech.securifyserver.Services.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    private final RoleService roleService;

    public UserController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @PutMapping("/roles/{userId}")
    public ResponseEntity<GeneralResponse> addRoleToUser(@PathVariable UUID userId, @RequestBody @Valid RoleDTO info){
        try {
            User user = userService.findOneById(userId);
            if ( user == null ) {
                return GeneralResponse.builder()
                        .status(HttpStatus.NOT_FOUND)
                        .message("User not found")
                        .getResponse();
            }

            Optional<Role> findRole = roleService.findByName(info.getRole());

            if (findRole.isEmpty()) {
                return GeneralResponse.builder()
                        .status(HttpStatus.NOT_FOUND)
                        .message("Role not found")
                        .getResponse();
            }

            Role roleToAdd = findRole.get();

            if (user.getRoles().contains(roleToAdd)) {
                return GeneralResponse.builder()
                        .status(HttpStatus.BAD_REQUEST)
                        .message("User already has the specified role")
                        .getResponse();
            }

            user.getRoles().add(roleToAdd);
            userService.saveUser(user);

            return GeneralResponse.builder()
                    .status(HttpStatus.OK)
                    .message("Role added to user successfully")
                    .getResponse();

        } catch (Exception e) {
            System.out.println("Error: " + e);
            return GeneralResponse.builder()
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .message("An error has occurred while adding role to user ")
                    .getResponse();
        }
    }


    @PutMapping("/update")
    public ResponseEntity<GeneralResponse> updateUser(@RequestBody @Valid CreateUserDTO info) {
        User user = userService.findByUsernameOrEmail(info.getUsername(), info.getUsername());
        if (user == null) {
            return GeneralResponse.builder()
                    .status(HttpStatus.NOT_FOUND)
                    .message("User not found")
                    .getResponse();
        }

        user.setUsername(info.getUsername());
        user.setDUI(info.getDui());
        user.setEmail(info.getDui());

        userService.saveUser(user);
    }
}
