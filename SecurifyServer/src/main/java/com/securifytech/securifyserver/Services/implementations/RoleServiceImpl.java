package com.securifytech.securifyserver.Services.implementations;

import com.securifytech.securifyserver.Domain.dtos.GeneralResponse;
import com.securifytech.securifyserver.Domain.dtos.RoleDTO;
import com.securifytech.securifyserver.Domain.entities.House;
import com.securifytech.securifyserver.Domain.entities.Role;
import com.securifytech.securifyserver.Domain.entities.User;
import com.securifytech.securifyserver.Repositories.HouseRepository;
import com.securifytech.securifyserver.Repositories.RoleRepository;
import com.securifytech.securifyserver.Services.HouseService;
import com.securifytech.securifyserver.Services.RoleService;
import com.securifytech.securifyserver.Services.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
public class RoleServiceImpl implements RoleService {

    @Autowired
    private UserService userService;


    private final RoleRepository roleRepository;

    private final HouseRepository houseRepository;


    public RoleServiceImpl(RoleRepository roleRepository, HouseRepository houseRepository) {
        this.roleRepository = roleRepository;
        this.houseRepository = houseRepository;
    }

    @Override
    public Optional<Role> findByName(String role) {
        return roleRepository.findByName(role);
    }

    @Override
    public void ChangeRole(RoleDTO info) {
        User user = userService.findByIdentifier(info.getUsername());
        Role visitor = roleRepository.findByName("Visitor").orElse(null);
        Role resident = roleRepository.findByName("Resident").orElse(null);
        if ( user == null ) {
            throw new RuntimeException("User not found");
        }

        Optional<Role> findRole = this.findByName(info.getRole());

        if (findRole.isEmpty()) {
            throw new RuntimeException("Role not found");
        }

        Role roleToAdd = findRole.get();

        if (user.getRoles().contains(roleToAdd)) {
            throw new RuntimeException("User already has the specified role");
        }

        if (roleToAdd.equals(visitor) && user.getRoles().equals(resident)) {
            House house = user.getHouse();
            house.getUsers().remove(user);
            user.setHouse(null);
            houseRepository.save(house);
            userService.saveUser(user);

        }

        user.getRoles().clear();
        user.getRoles().add(roleToAdd);
        userService.saveUser(user);
    }
}
