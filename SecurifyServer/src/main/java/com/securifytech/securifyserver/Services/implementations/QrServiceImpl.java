package com.securifytech.securifyserver.Services.implementations;

import com.securifytech.securifyserver.Domain.dtos.CreateQrTokenDTO;
import com.securifytech.securifyserver.Domain.dtos.GeneralResponse;
import com.securifytech.securifyserver.Domain.entities.*;
import com.securifytech.securifyserver.Enums.RequestState;
import com.securifytech.securifyserver.Repositories.PermissionRepository;
import com.securifytech.securifyserver.Repositories.QrTokenRepository;
import com.securifytech.securifyserver.Services.*;
import com.securifytech.securifyserver.Utils.JWTTools;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
public class QrServiceImpl implements QrService {

    @Autowired
    JWTTools jwtTools;

    @Autowired
    QrTokenRepository qrTokenRepository;

    @Autowired
    PermissionRepository permissionRepository;

    private final UserService userService;
    private final PermissionService permissionService;
    private final RoleService roleService;

    private final VisitService visitService;

    public QrServiceImpl(UserService userService, PermissionService permissionService, RoleService roleService, VisitService visitService) {
        this.userService = userService;
        this.permissionService = permissionService;
        this.roleService = roleService;
        this.visitService = visitService;
    }


    @Override
    public QrToken creatQrToken(CreateQrTokenDTO info) {
        User user = userService.findByIdentifier(info.getUsername());
        Permission permission = permissionService.findById(info.getPermissionId());
        Role resident = roleService.findByName("Resident").orElse(null);
        Role manager = roleService.findByName("Manager").orElse(null);
        Role admin = roleService.findByName("Admin").orElse(null);

        if (user.getRoles().contains(resident) || user.getRoles().contains(manager) || user.getRoles().contains(admin)) {
            return registerQrToken(user);
        } else {
          return registerQrTokenVisitor(user, permission);
        }
    }

    @Override
    public QrToken registerQrTokenVisitor(User user, Permission permission) {
        cleanQrTokensVisitor(user, permission);

        String tokenString = jwtTools.generateQrTokenVisitor(user, permission);
        QrToken qrToken = new QrToken(tokenString, user, permission);

        qrTokenRepository.save(qrToken);

        return qrToken;
    }

    @Override
    public QrToken registerQrToken(User user) {
        cleanQrTokens(user);

        String tokenString = jwtTools.generateQrToken(user);
        QrToken qrToken = new QrToken(tokenString, user, null);

        qrTokenRepository.save(qrToken);

        return qrToken;
    }

    @Override
    public void cleanQrTokensVisitor(User user, Permission permission) {
        List<QrToken> tokens = qrTokenRepository.findByUserAndActiveAndPermission(user, true, permission);

        tokens.forEach(token -> {
            if (!jwtTools.verifyToken(token.getContent())) {
                token.setActive(false);
                qrTokenRepository.save(token);
            }
        });
    }

    @Override
    public void cleanQrTokens(User user) {
        List<QrToken> tokens = qrTokenRepository.findByUserAndActive(user, true);

        tokens.forEach(token -> {
            if (!jwtTools.verifyToken(token.getContent())) {
                token.setActive(false);
                qrTokenRepository.save(token);
            }
        });
    }

    @Override
    public Boolean VerifyToken(String token) {
        QrToken qrToken = qrTokenRepository.findByContent(token).orElse(null);
        String username = jwtTools.getUsernameFrom(token);
        User user = userService.findByUsernameOrEmail(username, username);
        UUID idPermission = jwtTools.getIdPermissionFrom(token);
        Role resident = roleService.findByName("Resident").orElse(null);

        if (qrToken != null) {
            if (!qrToken.getActive()) {
                throw new RuntimeException("Qr has already been used");
            }

            if (user != null) {
                if (user.getRoles().contains(resident)) {
                    return true;
                }

                Permission permission = permissionService.findById(idPermission);
                if (permission != null) {
                    if (permission.getStatus().equals(RequestState.APPROVED) && permission.getVisitor().equals(user) && permission.getRequestedDated().equals(Date.from(Instant.now())) && !jwtTools.isTokenExpired(token)){
                        qrToken.setActive(false);
                        qrTokenRepository.save(qrToken);
                        permission.setStatus(RequestState.USED);
                        permissionRepository.save(permission);
                        visitService.createVisit(user, permission.getHouse(), permission.getDescription());
                        return true;
                    }
                }
            }


        }

        return false;
    }


}
