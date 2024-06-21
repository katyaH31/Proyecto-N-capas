package com.securifytech.securifyserver.Services.implementations;

import com.securifytech.securifyserver.Domain.entities.House;
import com.securifytech.securifyserver.Repositories.HouseRepository;
import com.securifytech.securifyserver.Services.HouseService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class HouseServiceImpl implements HouseService {

    private final HouseRepository houseRepository;

    public HouseServiceImpl(HouseRepository houseRepository) {
        this.houseRepository = houseRepository;
    }

    @Override
    public House findById(String idHouse) {
        return houseRepository.findById(idHouse).orElse(null);
    }
}
