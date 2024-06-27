package com.securifytech.securifyserver.Services.implementations;

import com.securifytech.securifyserver.Domain.dtos.CreateUserDTO;
import com.securifytech.securifyserver.Domain.dtos.UserRegisterDTO;
import com.securifytech.securifyserver.Domain.entities.House;
import com.securifytech.securifyserver.Domain.entities.Role;
import com.securifytech.securifyserver.Domain.entities.Token;
import com.securifytech.securifyserver.Domain.entities.User;
import com.securifytech.securifyserver.Repositories.HouseRepository;
import com.securifytech.securifyserver.Repositories.RoleRepository;
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
import java.util.Optional;
import java.util.UUID;

@Service
@Slf4j
public class UserServiceImpl implements UserService {


    @Autowired
    private JWTTools jwtTools;

    @Autowired
    private TokenRepository tokenRepository;

    private final UserRepository userRepository;

    private final RoleRepository roleRepository;

    private final HouseRepository houseRepository;

    public UserServiceImpl(UserRepository userRepository, HouseRepository houseRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.houseRepository = houseRepository;
        this.roleRepository = roleRepository;
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
    public void createUser(CreateUserDTO info, List<Role> roles) {
        User user = new User();

        user.setUsername(info.getUsername());
        user.setEmail(info.getEmail());
        user.setDUI(info.getDui());
        user.setActive(true);
        user.setRoles(roles);
       // user.setHouses(houses);
        userRepository.save(user);
    }

    @Override
    public void saveUser(User user) {
        userRepository.save(user);
    }

    @Override
    public List<User> getUsersExcludingAdmin() {
        Optional<Role> adminRoleOptional = roleRepository.findByName("Admin");
        if (adminRoleOptional.isPresent()) {
            Role adminRole = adminRoleOptional.get();
            return userRepository.findByRolesNotContaining(adminRole);
        } else {
            return userRepository.findAll();
        }
    }

    @Override
    public void deleteUserById(UUID id){
        userRepository.deleteById(id);
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

    @Override

    public User updateUserById(UUID id, CreateUserDTO info) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        user.setUsername(info.getUsername());
        user.setEmail(info.getEmail());
        user.setDUI(info.getDui());
        return userRepository.save(user);
    }

    @Override
    public List<User> getGuardUsers(){
        Role guardRole = roleRepository.findByName("Guard").orElseThrow(() -> new RuntimeException("Role not found"));
        return userRepository.findByRolesContaining(guardRole);
    }

    @Override
    public void createFirebaseUser(String name, String email) {
        User user = new User();
        Role role = roleRepository.findByName("Visitor").orElse(null);
        List<Role> roles = List.of(role);

        user.setUsername(name);
        user.setEmail(email);
        user.setRoles(roles);
        user.setActive(true);

        userRepository.save(user);
    }


    @Override
    @Transactional(rollbackOn = Exception.class)
    public void verifyUser(String name, String email) {
        User user = userRepository.findByUsernameOrEmail(name, name).orElse(null);


        if (user == null) {
            createFirebaseUser(name, email);
        }
    }
}
