package com.securifytech.securifyserver.Services;


import com.securifytech.securifyserver.Domain.entities.User;

public interface UserService {
    User findByIdentifier(String identifier);

    User findByUsernameOrEmail(String name, String email);

    // Token management

    Boolean isTokenValid(User user, String token);

    void cleanTokens(User user);
}
