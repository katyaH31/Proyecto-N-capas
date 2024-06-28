package com.securifytech.securifyserver.Services.implementations;

import com.securifytech.securifyserver.Domain.dtos.GeneralResponse;
import com.securifytech.securifyserver.Domain.entities.Permission;
import com.securifytech.securifyserver.Domain.entities.QrToken;
import com.securifytech.securifyserver.Domain.entities.Token;
import com.securifytech.securifyserver.Domain.entities.User;
import com.securifytech.securifyserver.Enums.RequestState;
import com.securifytech.securifyserver.Repositories.QrTokenRepository;
import com.securifytech.securifyserver.Services.PermissionService;
import com.securifytech.securifyserver.Services.QrService;
import com.securifytech.securifyserver.Services.UserService;
import com.securifytech.securifyserver.Utils.JWTTools;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class QrServiceImpl implements QrService {

    @Autowired
    JWTTools jwtTools;

    @Autowired
    QrTokenRepository qrTokenRepository;

    private final UserService userService;
    private final PermissionService permissionService;

    public QrServiceImpl(UserService userService, PermissionService permissionService) {
        this.userService = userService;
        this.permissionService = permissionService;
    }

    @Override
    public QrToken registerQrToken(User user, Permission permission) {
        cleanQrTokens(user, permission);

        String tokenString = jwtTools.generateQrToken(user, permission);
        QrToken qrToken = new QrToken(tokenString, user, permission);

        qrTokenRepository.save(qrToken);

        return qrToken;
    }

    @Override
    public void cleanQrTokens(User user, Permission permission) {
        List<QrToken> tokens = qrTokenRepository.findByUserAndActiveAndPermission(user, true, permission);


        tokens.forEach(token -> {
            if (!jwtTools.verifyToken(token.getContent())) {
                token.setActive(false);
                qrTokenRepository.save(token);
            }
        });
    }

    @Override
    public Boolean VerifyToken(String qrToken) {
        String username = jwtTools.getUsernameFrom(qrToken);
        User user = userService.findByUsernameOrEmail(username, username);
        UUID idPermission = jwtTools.getIdPermissionFrom(qrToken);
        Permission permission = permissionService.findById(idPermission);

        if (user == null) {
            return false;
        }
        if (permission == null) {
            return false;
        }
        if(permission.getStatus() == RequestState.DENIED) {
            return false;
        }
        if(permission.getStatus() == RequestState.PENDING) {
            return false;
        }

        return true;
    }


}
