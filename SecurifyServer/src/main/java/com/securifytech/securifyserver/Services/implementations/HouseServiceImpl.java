package com.securifytech.securifyserver.Services.implementations;

import com.securifytech.securifyserver.Domain.dtos.CreateHouseDto;
import com.securifytech.securifyserver.Domain.entities.House;
import com.securifytech.securifyserver.Domain.entities.User;
import com.securifytech.securifyserver.Repositories.HouseRepository;
import com.securifytech.securifyserver.Repositories.UserRepository;
import com.securifytech.securifyserver.Services.HouseService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class HouseServiceImpl implements HouseService {

    private final HouseRepository houseRepository;

    private final UserRepository userRepository;

    public HouseServiceImpl(HouseRepository houseRepository, UserRepository userRepository) {
        this.houseRepository = houseRepository;
        this.userRepository = userRepository;
    }

    @Override
    public House findById(String idHouse) {
        return houseRepository.findById(idHouse).orElse(null);
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
}
