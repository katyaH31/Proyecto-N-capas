package com.securifytech.securifyserver.Services;


import com.securifytech.securifyserver.Domain.dtos.CreateUserDTO;
import com.securifytech.securifyserver.Domain.dtos.UserRegisterDTO;
import com.securifytech.securifyserver.Domain.entities.Role;
import com.securifytech.securifyserver.Domain.entities.Token;
import com.securifytech.securifyserver.Domain.entities.User;

import java.util.List;
import java.util.UUID;


public interface UserService {
    User findByIdentifier(String identifier);

    User findByUsernameOrEmail(String name, String email);

    User findOneById(UUID id);

    void createUser(CreateUserDTO info, List<Role> roles);

    void saveUser(User user);

    void deleteUser(User user);


    // Token management

    Boolean isTokenValid(User user, String token);

    Token RegisterToken(User user);

    void cleanTokens(User user);

    // With Token

    User findUserAuthenticated();
}
