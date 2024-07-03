package com.securifytech.securifyserver.Services;

import com.securifytech.securifyserver.Domain.dtos.CreateQrTokenDTO;
import com.securifytech.securifyserver.Domain.dtos.QrTokenDTO;
import com.securifytech.securifyserver.Domain.entities.Permission;
import com.securifytech.securifyserver.Domain.entities.QrToken;
import com.securifytech.securifyserver.Domain.entities.User;

public interface QrService {

    QrToken registerQrTokenVisitor(User user, Permission permission);

    QrToken registerQrToken(User user);

    QrToken creatQrToken(CreateQrTokenDTO info);

    void cleanQrTokensVisitor(User user, Permission permission);

    void cleanQrTokens(User user);

    Boolean VerifyToken(String qrToken);

}
