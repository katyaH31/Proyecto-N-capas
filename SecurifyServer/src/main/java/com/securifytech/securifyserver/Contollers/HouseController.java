package com.securifytech.securifyserver.Contollers;

import com.securifytech.securifyserver.Domain.dtos.ChangeManagerDTO;
import com.securifytech.securifyserver.Domain.dtos.CreateHouseDto;
import com.securifytech.securifyserver.Domain.dtos.GeneralResponse;
import com.securifytech.securifyserver.Domain.dtos.UpdateHouseDto;
import com.securifytech.securifyserver.Domain.entities.House;
import com.securifytech.securifyserver.Domain.entities.User;
import com.securifytech.securifyserver.Domain.entities.Visit;
import com.securifytech.securifyserver.Services.HouseService;
import com.securifytech.securifyserver.Services.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/house")
public class HouseController {

    private final UserService userService;

    private final HouseService houseService;

    public HouseController(UserService userService, HouseService houseService) {
        this.userService = userService;
        this.houseService = houseService;
    }

    @PutMapping("/changeManager")
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


    @PostMapping
    public ResponseEntity<GeneralResponse> createHouse(@RequestBody CreateHouseDto houseDto){
        houseService.createHouse(houseDto);
        return GeneralResponse.builder()
                .status(HttpStatus.OK)
                .message("House created successfully")
                .getResponse();
    }

    @PutMapping("/{houseId}")
    public ResponseEntity<GeneralResponse> updateHouse(@PathVariable String houseId, @RequestBody UpdateHouseDto houseDto){
        houseService.updateHouse(houseId, houseDto);
        return GeneralResponse.builder()
                .status(HttpStatus.OK)
                .message("House updated successfully")
                .getResponse();
    }

    @GetMapping("/all")
    public ResponseEntity<GeneralResponse> getAllHouses(){
        List<House> houses = houseService.getAllHouses();
        return GeneralResponse.builder()
                .status(HttpStatus.OK)
                .message("Houses retrieved successfully")
                .data(houses)
                .getResponse();
    }

    @GetMapping("/history/visits/{houseId}")
    public ResponseEntity<GeneralResponse> getHouseVisits(@PathVariable String houseId){
        List<Visit> visits = houseService.getVisitHistory(houseId);
        return GeneralResponse.builder()
                .status(HttpStatus.OK)
                .message("Visit History retrieved succesfully")
                .data(visits)
                .getResponse();

    }

    @GetMapping("/{houseId}/residents")
    public ResponseEntity<GeneralResponse> getResidents(@PathVariable String houseId){
        List<User> residents = houseService.getResidents(houseId);
        return GeneralResponse.builder()
                .status(HttpStatus.OK)
                .message("Residents retrieved succesfully")
                .data(residents)
                .getResponse();
    }
}
