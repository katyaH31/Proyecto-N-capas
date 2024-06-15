package com.securifytech.securifyserver.Services;


import com.securifytech.securifyserver.Domain.dtos.UserRegisterDTO;
import com.securifytech.securifyserver.Domain.entities.Token;
import com.securifytech.securifyserver.Domain.entities.User;

import java.util.UUID;


public interface UserService {
    User findByIdentifier(String identifier);

    User findByUsernameOrEmail(String name, String email);

    User findOneById(UUID id);

    void verifyUser(String name, String email);

    void createUser(String name, String email);

    void saveUser(User user);


    // Token management

    Boolean isTokenValid(User user, String token);

    Token RegisterToken(User user);

    void cleanTokens(User user);
}
