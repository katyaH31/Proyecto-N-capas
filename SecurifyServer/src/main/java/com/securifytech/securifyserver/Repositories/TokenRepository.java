package com.securifytech.securifyserver.Repositories;

import com.securifytech.securifyserver.Domain.entities.Token;
import com.securifytech.securifyserver.Domain.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface TokenRepository extends JpaRepository<Token, UUID> {
    List<Token> findByUserAndActive(User user, Boolean active);
}
