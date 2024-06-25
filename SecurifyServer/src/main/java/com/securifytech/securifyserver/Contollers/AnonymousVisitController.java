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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/visits")
public class AnonymousVisitController {
    @Autowired
    private AnonymousVisitService anonymousVisitService;

    @Autowired
    private UserService userService;

    @PostMapping("/anonymous")
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
}
