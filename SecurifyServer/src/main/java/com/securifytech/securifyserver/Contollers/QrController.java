package com.securifytech.securifyserver.Contollers;

import com.securifytech.securifyserver.Domain.dtos.CreateQrTokenDTO;
import com.securifytech.securifyserver.Domain.dtos.GeneralResponse;
import com.securifytech.securifyserver.Domain.dtos.QrTokenDTO;
import com.securifytech.securifyserver.Domain.entities.Permission;
import com.securifytech.securifyserver.Domain.entities.QrToken;
import com.securifytech.securifyserver.Domain.entities.User;
import com.securifytech.securifyserver.Services.PermissionService;
import com.securifytech.securifyserver.Services.QrService;
import com.securifytech.securifyserver.Services.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/qr")
public class QrController {

    private final UserService userService;

    private final PermissionService permissionService;

    private final QrService qrService;

    public QrController(UserService userService, PermissionService permissionService, QrService qrService) {
        this.userService = userService;
        this.permissionService = permissionService;
        this.qrService = qrService;
    }

    @PostMapping("/create")
    public ResponseEntity<GeneralResponse> createQrToken(@RequestBody @Valid CreateQrTokenDTO createQrTokenDTO) {
        User user = userService.findByUsernameOrEmail(createQrTokenDTO.getUsername(), createQrTokenDTO.getUsername());
        Permission permission = permissionService.findById(createQrTokenDTO.getPermissionId());

        if (user == null) {
            return GeneralResponse.builder()
                    .status(HttpStatus.NOT_FOUND)
                    .message("User not Found")
                    .getResponse();
        }

        if (permission == null) {
            return GeneralResponse.builder()
                    .status(HttpStatus.NOT_FOUND)
                    .message("Permission not found")
                    .getResponse();
        }

        try {
            QrToken token = qrService.registerQrToken(user, permission);
            return GeneralResponse.builder()
                    .status(HttpStatus.CREATED)
                    .data(token.getContent())
                    .getResponse();
        } catch (Exception e) {
            e.printStackTrace();
            return GeneralResponse.builder()
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .getResponse();
        }
    }

    @PostMapping("/validate")
    public ResponseEntity<GeneralResponse> validateQr(@RequestBody @Valid QrTokenDTO tokenDTO) {
        try {
            Boolean response = qrService.VerifyToken(tokenDTO.getToken());

            if (!response) {
                return GeneralResponse.builder()
                        .status(HttpStatus.NOT_FOUND)
                        .data(false)
                        .getResponse();
            }

            return GeneralResponse.builder()
                    .status(HttpStatus.OK)
                    .data(true)
                    .getResponse();
        } catch (Exception e) {
            e.printStackTrace();
            return GeneralResponse.builder()
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .getResponse();
        }

    }

    @GetMapping("/servo")
    public ResponseEntity<GeneralResponse> sendToServo(@RequestParam Boolean flag) {
        if (flag) {
            return GeneralResponse.builder()
                    .status(HttpStatus.OK)
                    .data(true)
                    .getResponse();
        }

        return GeneralResponse.builder()
                .status(HttpStatus.OK)
                .data(false)
                .getResponse();
    }
}
