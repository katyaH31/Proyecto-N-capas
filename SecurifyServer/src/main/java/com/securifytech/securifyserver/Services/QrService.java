package com.securifytech.securifyserver.Services;

import com.securifytech.securifyserver.Domain.entities.Permission;
import com.securifytech.securifyserver.Domain.entities.QrToken;
import com.securifytech.securifyserver.Domain.entities.User;

public interface QrService {

    QrToken registerQrToken(User user, Permission permission);

    void cleanQrTokens(User user, Permission permission);

    Boolean VerifyToken(String qrToken);

}
