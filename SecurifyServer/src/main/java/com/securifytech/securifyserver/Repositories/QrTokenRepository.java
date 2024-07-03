package com.securifytech.securifyserver.Repositories;

import com.securifytech.securifyserver.Domain.entities.Permission;
import com.securifytech.securifyserver.Domain.entities.QrToken;
import com.securifytech.securifyserver.Domain.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface QrTokenRepository extends JpaRepository<QrToken, UUID> {

    List<QrToken> findByUserAndActiveAndPermission(User user, Boolean active, Permission permission);

    List<QrToken> findByUserAndActive(User user, Boolean active);

    Optional<QrToken> findByContent(String content);

}
