package com.securifytech.securifyserver.Contollers;

import com.securifytech.securifyserver.Domain.dtos.CreateAnonymousVisitDto;
import com.securifytech.securifyserver.Domain.dtos.GeneralResponse;
import com.securifytech.securifyserver.Domain.entities.AnonymousVisit;
import com.securifytech.securifyserver.Domain.entities.User;
import com.securifytech.securifyserver.Services.AnonymousVisitService;
import com.securifytech.securifyserver.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/anonymous")
public class AnonymousVisitController {
    @Autowired
    private AnonymousVisitService anonymousVisitService;

    @Autowired
    private UserService userService;

    @PostMapping("/create")
    public ResponseEntity<GeneralResponse> createAnonymousVisit(@RequestBody CreateAnonymousVisitDto visitDto) {
        User user = userService.findUserAuthenticated();
        anonymousVisitService.createAnonymousVisit(visitDto, user);
        if (user == null){
            return GeneralResponse.builder()
                    .status(HttpStatus.NOT_FOUND)
                    .message("user not found")
                    .getResponse();
        }
        return GeneralResponse.builder()
                .status(HttpStatus.OK)
                .message("Anonymous visit created succesfully")
                .getResponse();
    }

    @GetMapping("/all")
    public ResponseEntity<GeneralResponse> getAllAnonymousVisit() {
        List<AnonymousVisit> anonymousVisits = anonymousVisitService.getAllAnonymousVisit();
        List<AnonymousVisit> emptyList = Collections.emptyList();
        try {
            if (anonymousVisits == null) {
                return GeneralResponse.builder()
                        .status(HttpStatus.OK)
                        .message("Anonymous visits:")
                        .data(emptyList)
                        .getResponse();
            }
            return GeneralResponse.builder()
                    .status(HttpStatus.OK)
                    .message("Anonymous visits:")
                    .data(anonymousVisits)
                    .getResponse();
        } catch (Exception e) {
            e.printStackTrace();
            return GeneralResponse.builder()
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .getResponse();
        }
    }
}
