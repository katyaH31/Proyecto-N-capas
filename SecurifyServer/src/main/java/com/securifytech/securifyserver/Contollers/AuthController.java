package com.securifytech.securifyserver.Contollers;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import com.securifytech.securifyserver.Domain.dtos.CreateUserDTO;
import com.securifytech.securifyserver.Domain.dtos.GeneralResponse;
import com.securifytech.securifyserver.Domain.dtos.UserLoginDTO;
import com.securifytech.securifyserver.Domain.dtos.UserRegisterDTO;
import com.securifytech.securifyserver.Domain.entities.Role;
import com.securifytech.securifyserver.Domain.entities.Token;
import com.securifytech.securifyserver.Domain.entities.User;
import com.securifytech.securifyserver.Services.RoleService;
import com.securifytech.securifyserver.Services.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    private final RoleService roleService;

    public AuthController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }


    @PostMapping("/google")
    public ResponseEntity<GeneralResponse> authenticateUser(@RequestHeader("Authorization") String firebaseToken) {
        try {
            String idToken = firebaseToken.substring(7);
            FirebaseToken decodeToken = FirebaseAuth.getInstance().verifyIdToken(idToken);
            String username = decodeToken.getName();
            String email = decodeToken.getEmail();

            User user = userService.findByUsernameOrEmail(email, email);
            if (user == null) {
                userService.createFirebaseUser(username, email);

            }
            user = userService.findByUsernameOrEmail(email, email);
            Token token = userService.RegisterToken(user);
            return GeneralResponse.builder()
                    .status(HttpStatus.OK)
                    .message("User token:")
                    .data(token.getContent())
                    .role(user)
                    .getResponse();

        } catch (Exception e){
            e.printStackTrace();
            return GeneralResponse.builder()
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .getResponse();
        }

    }

    @RequestMapping("/me")
    public ResponseEntity<GeneralResponse> GetMyInformation(){
        try {
            User user = userService.findUserAuthenticated();

            if (user == null) {
                return GeneralResponse.builder()
                        .status(HttpStatus.NOT_FOUND)
                        .message("User not found")
                        .getResponse();
            }

            return GeneralResponse.builder()
                    .status(HttpStatus.OK)
                    .message("User found!")
                    .data(user)
                    .getResponse();
        } catch (Exception e) {
            e.printStackTrace();
            return GeneralResponse.builder()
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .getResponse();
        }
    }

    @PostMapping("/register/resident")
    public ResponseEntity<GeneralResponse> RegisterResident(@RequestBody @Valid CreateUserDTO info) {
        User user = userService.findByUsernameOrEmail(info.getEmail(), info.getEmail());

        if (user != null) {
            return GeneralResponse.builder()
                    .status(HttpStatus.CONFLICT)
                    .message("User already existed")
                    .getResponse();
        }

        try {
            Role role = roleService.findByName("Resident").orElse(null);
            if (role != null) {
                List<Role> roles = List.of(role);
                userService.createUser(info, roles);
            }

            return GeneralResponse.builder()
                    .status(HttpStatus.CREATED)
                    .message("Resident created")
                    .getResponse();
        } catch (Exception e) {
            e.printStackTrace();
            return GeneralResponse.builder()
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .getResponse();
        }
    }

    @PostMapping("/register/guard")
    public ResponseEntity<GeneralResponse> RegisterGuard(@RequestBody @Valid CreateUserDTO info ){
        User user = userService.findByUsernameOrEmail(info.getEmail(), info.getEmail());

        if (user != null) {
            return GeneralResponse.builder()
                    .status(HttpStatus.CONFLICT)
                    .message("User already existed")
                    .getResponse();
        }

        try {
            Role role = roleService.findByName("Guard").orElse(null);
            if (role != null) {
                List<Role> roles = List.of(role);
                userService.createUser(info, roles);
            }

            return GeneralResponse.builder()
                    .status(HttpStatus.CREATED)
                    .message("Resident created")
                    .getResponse();
        } catch (Exception e) {
            e.printStackTrace();
            return GeneralResponse.builder()
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .getResponse();
        }
    }


}
