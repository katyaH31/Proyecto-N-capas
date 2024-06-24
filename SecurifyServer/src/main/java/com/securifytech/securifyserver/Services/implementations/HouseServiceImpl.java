package com.securifytech.securifyserver.Services.implementations;

import com.securifytech.securifyserver.Domain.dtos.CreateHouseDto;
import com.securifytech.securifyserver.Domain.dtos.UpdateHouseDto;
import com.securifytech.securifyserver.Domain.entities.House;
import com.securifytech.securifyserver.Domain.entities.Role;
import com.securifytech.securifyserver.Domain.entities.User;
import com.securifytech.securifyserver.Domain.entities.Visit;
import com.securifytech.securifyserver.Repositories.HouseRepository;
import com.securifytech.securifyserver.Repositories.RoleRepository;
import com.securifytech.securifyserver.Repositories.UserRepository;
import com.securifytech.securifyserver.Repositories.VisitRepository;
import com.securifytech.securifyserver.Services.HouseService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class HouseServiceImpl implements HouseService {

    private final HouseRepository houseRepository;

    private final UserRepository userRepository;

    private final RoleRepository roleRepository;

    private final VisitRepository visitRepository;

    public HouseServiceImpl(HouseRepository houseRepository, UserRepository userRepository, RoleRepository roleRepository, VisitRepository visitRepository) {
        this.houseRepository = houseRepository;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.visitRepository = visitRepository;
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

    @Override
    public void createHouse(CreateHouseDto houseDto){
        House house = new House();
        house.setId(houseDto.getHouseId());
        house.setPolygon(houseDto.getPolygon());
        house.setNumberOfResidents(houseDto.getNumberOfResidents());

        User resident = userRepository.findById(houseDto.getResidentId())
                .orElseThrow(() -> new RuntimeException("Resident not found"));

        house.setUsers(List.of(resident));

        houseRepository.save(house);
    }

    @Override
    public void updateHouse(String houseId, UpdateHouseDto houseDto) {
        House house = houseRepository.findById(houseId)
                .orElseThrow(() -> new RuntimeException("House not found"));

        house.setNumberOfResidents(houseDto.getNumberOfResidents());

        User resident = userRepository.findById(houseDto.getResidentID())
                .orElseThrow(() -> new RuntimeException("Resident not found"));

        house.getUsers().clear();
        house.getUsers().add(resident);
        houseRepository.save(house);
    }

    @Override
    public List<House> getAllHouses() {
        return houseRepository.findAll();
    }

    @Override
    public List<Visit> getVisitHistory(String houseId) {
        return visitRepository.findByHouseId(houseId);
    }

    @Override
    public List<User> getResidents(String houseId) {
        House house = houseRepository.findById(houseId)
                .orElseThrow(() -> new RuntimeException("House not found"));
        return house.getUsers();
    }
}
