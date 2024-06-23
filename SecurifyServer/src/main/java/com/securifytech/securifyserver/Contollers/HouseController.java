package com.securifytech.securifyserver.Contollers;


import com.securifytech.securifyserver.Domain.dtos.CreateHouseDto;
import com.securifytech.securifyserver.Domain.dtos.GeneralResponse;
import com.securifytech.securifyserver.Domain.dtos.UpdateHouseDto;
import com.securifytech.securifyserver.Domain.entities.House;
import com.securifytech.securifyserver.Services.HouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/houses")
public class HouseController {

    @Autowired
    private HouseService houseService;

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
}
