package com.securifytech.securifyserver.Services.implementations;

import com.securifytech.securifyserver.Domain.entities.House;
import com.securifytech.securifyserver.Domain.entities.Role;
import com.securifytech.securifyserver.Domain.entities.User;
import com.securifytech.securifyserver.Repositories.HouseRepository;
import com.securifytech.securifyserver.Repositories.RoleRepository;
import com.securifytech.securifyserver.Repositories.UserRepository;
import com.securifytech.securifyserver.Services.HouseService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class HouseServiceImpl implements HouseService {

    private final HouseRepository houseRepository;

    private final UserRepository userRepository;

    private final RoleRepository roleRepository;

    public HouseServiceImpl(HouseRepository houseRepository, UserRepository userRepository, RoleRepository roleRepository) {
        this.houseRepository = houseRepository;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    @Override
    public House findById(String idHouse) {
        return houseRepository.findById(idHouse).orElse(null);
    }

    @Override
    public void ChangeHouseManager(House house, User newManager) {

        Role managerRole = roleRepository.findByName("Manager").orElse(null);

        house.getUsers().forEach(user -> {
            if (!user.getRoles().contains(managerRole)) {
                user.getRoles().remove(managerRole);
                userRepository.save(user);
            }
        });


        if (!newManager.getRoles().contains(managerRole)) {
            newManager.getRoles().add(managerRole);
        }
        userRepository.save(newManager);
    }
}
