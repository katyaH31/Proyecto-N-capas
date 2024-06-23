package com.securifytech.securifyserver.Contollers;

import com.securifytech.securifyserver.Domain.dtos.ChangeManagerDTO;
import com.securifytech.securifyserver.Domain.dtos.GeneralResponse;
import com.securifytech.securifyserver.Domain.entities.House;
import com.securifytech.securifyserver.Domain.entities.User;
import com.securifytech.securifyserver.Services.HouseService;
import com.securifytech.securifyserver.Services.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/house")
public class HouseController {

    private final UserService userService;

    private final HouseService houseService;

    public HouseController(UserService userService, HouseService houseService) {
        this.userService = userService;
        this.houseService = houseService;
    }

    public ResponseEntity<GeneralResponse> ChangeManager(@RequestBody @Valid ChangeManagerDTO info) {
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
                    .message("House not found")
                    .getResponse();
        }

        try {
            houseService.ChangeHouseManager(house, user);

            return GeneralResponse.builder()
                    .status(HttpStatus.OK)
                    .message("Manager changed successfully")
                    .getResponse();
        } catch (Exception e) {
            e.printStackTrace();
            return GeneralResponse.builder()
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .getResponse();
        }
    }
}
