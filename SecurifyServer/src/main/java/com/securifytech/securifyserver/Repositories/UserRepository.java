package com.securifytech.securifyserver.Repositories;

import com.securifytech.securifyserver.Domain.entities.Role;
import com.securifytech.securifyserver.Domain.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByUsernameOrEmail(String username, String email);

    //List user not-admin
    List<User> findByRolesNotContaining(Role role);
    List<User> findByRolesContaining(Role role);
}
