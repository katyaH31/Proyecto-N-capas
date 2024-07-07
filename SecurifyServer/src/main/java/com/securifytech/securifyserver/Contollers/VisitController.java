package com.securifytech.securifyserver.Contollers;

import com.securifytech.securifyserver.Domain.dtos.GeneralResponse;
import com.securifytech.securifyserver.Domain.dtos.GetVisitsUserDTO;
import com.securifytech.securifyserver.Domain.entities.House;
import com.securifytech.securifyserver.Domain.entities.User;
import com.securifytech.securifyserver.Domain.entities.Visit;
import com.securifytech.securifyserver.Services.HouseService;
import com.securifytech.securifyserver.Services.UserService;
import com.securifytech.securifyserver.Services.VisitService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/visits")
@RestController
public class VisitController {

    @Autowired
    private VisitService visitService;

    @Autowired
    private UserService userService;

    @Autowired
    private HouseService houseService;

    @GetMapping("/all")
    public ResponseEntity<GeneralResponse> GetAllVisits() {
        try {
            List<Visit> visits = visitService.getAllVisits();

            return GeneralResponse.builder()
                    .status(HttpStatus.OK)
                    .message("Visits found:")
                    .data(visits)
                    .getResponse();
        } catch (Exception e) {
            e.printStackTrace();
            return GeneralResponse.builder()
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .getResponse();
        }
    }

    @GetMapping("/user")
    public ResponseEntity<GeneralResponse> GetVisitsByUsers(@RequestBody @Valid GetVisitsUserDTO info) {
        User user = userService.findByIdentifier(info.getUsername());

        if (user == null) {
            return GeneralResponse.builder()
                    .status(HttpStatus.NOT_FOUND)
                    .message("User not found")
                    .getResponse();
        }

        try {
            List<Visit> visits = visitService.getByUser(user);
            return GeneralResponse.builder()
                    .status(HttpStatus.OK)
                    .message("Visits found")
                    .data(visits)
                    .getResponse();
        } catch (Exception e) {
            e.printStackTrace();
            return GeneralResponse.builder()
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .getResponse();
        }
    }

    @GetMapping("/house")
    public ResponseEntity<GeneralResponse> GetVisitsByHouse() {
        User user = userService.findUserAuthenticated();
        House house = user.getHouse();

        if (house == null) {
            return GeneralResponse.builder()
                    .status(HttpStatus.NOT_FOUND)
                    .message("House not found")
                    .getResponse();
        }

        try {
            List<Visit> visits = visitService.getByHouse(house);
            return GeneralResponse.builder()
                    .status(HttpStatus.OK)
                    .message("Visits found")
                    .data(visits)
                    .getResponse();
        } catch (Exception e) {
            e.printStackTrace();
            return GeneralResponse.builder()
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .getResponse();
        }
    }

}
