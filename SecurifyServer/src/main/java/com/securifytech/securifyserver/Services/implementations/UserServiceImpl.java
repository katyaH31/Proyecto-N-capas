package com.securifytech.securifyserver.Services.implementations;

import com.securifytech.securifyserver.Domain.dtos.UserRegisterDTO;
import com.securifytech.securifyserver.Domain.entities.House;
import com.securifytech.securifyserver.Domain.entities.Token;
import com.securifytech.securifyserver.Domain.entities.User;
import com.securifytech.securifyserver.Repositories.HouseRepository;
import com.securifytech.securifyserver.Repositories.TokenRepository;
import com.securifytech.securifyserver.Repositories.UserRepository;
import com.securifytech.securifyserver.Services.UserService;
import com.securifytech.securifyserver.Utils.JWTTools;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@Slf4j
public class UserServiceImpl implements UserService {


    @Autowired
    private JWTTools jwtTools;

    @Autowired
    private TokenRepository tokenRepository;

    private final UserRepository userRepository;

    private final HouseRepository houseRepository;

    public UserServiceImpl(UserRepository userRepository, HouseRepository houseRepository) {
        this.userRepository = userRepository;
        this.houseRepository = houseRepository;
    }

    @Override
    public User findByIdentifier(String identifier) {
        return userRepository.findByUsernameOrEmail(identifier, identifier).orElse(null);
    }

    @Override
    public User findByUsernameOrEmail(String name, String email) {
        return userRepository.findByUsernameOrEmail(name, email).orElse(null); 
    }

    @Override
    public User findOneById(UUID id) {
        return userRepository.findById(id).orElse(null);
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public void verifyUser(String name, String email) {
        User user = findByIdentifier(email);

        if (user == null) {
            createUser(name, email);
        }
    }


    @Override
    @Transactional(rollbackOn = Exception.class)
    public void createUser(String name, String email) {
        User user = new User();
        String idHouse = "1";
        List<House> houses = houseRepository.findByIdAndBlock(idHouse, "Block A");

        user.setUsername(name);
        user.setEmail(email);
        user.setActive(true);
        user.setHouses(houses);
        userRepository.save(user);
    }

    @Override
    public void saveUser(User user) {
        userRepository.save(user);
    }


    @Override
    public Boolean isTokenValid(User user, String token){
         try {
             cleanTokens(user);
             List<Token> tokens = tokenRepository.findByUserAndActive(user, true);

             tokens.stream()
                     .filter(tk -> tk.getContent().equals(token))
                     .findAny()
                     .orElseThrow(Exception::new);

             return true;
         } catch (Exception e) {
             return false;
         }
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public Token RegisterToken(User user) {
        cleanTokens(user);

        String tokenString = jwtTools.generateToken(user);
        Token token = new Token(tokenString, user);

        tokenRepository.save(token);

        return token;
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public void cleanTokens(User user) {
        List<Token> tokens = tokenRepository.findByUserAndActive(user, true);

        tokens.forEach(token -> {
            if (!jwtTools.verifyToken(token.getContent())) {
                token.setActive(false);
                tokenRepository.save(token);
            }
        });
    }

    @Override
    public User findUserAuthenticated() {
        String username = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        return userRepository.findByUsernameOrEmail(username, username).orElse(null);
    }
}
