package com.securifytech.securifyserver.Services.implementations;

import com.securifytech.securifyserver.Domain.entities.Token;
import com.securifytech.securifyserver.Domain.entities.User;
import com.securifytech.securifyserver.Repositories.TokenRepository;
import com.securifytech.securifyserver.Repositories.UserRepository;
import com.securifytech.securifyserver.Services.UserService;
import com.securifytech.securifyserver.Utils.JWTTools;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class UserServiceImpl implements UserService {


    @Autowired
    private JWTTools jwtTools;

    @Autowired
    private TokenRepository tokenRepository

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
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
    public void cleanTokens(User user) {
        List<Token> tokens = tokenRepository.findByUserAndActive(user, true);

        tokens.forEach(token -> {
            if (!jwtTools.verifyToken(token.getContent())) {
                token.setActive(false);
                tokenRepository.save(token);
            }
        });
    }
}
