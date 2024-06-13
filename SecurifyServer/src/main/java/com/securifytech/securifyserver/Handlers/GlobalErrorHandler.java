package com.securifytech.securifyserver.Handlers;


import com.securifytech.securifyserver.Domain.dtos.GeneralResponse;
import com.securifytech.securifyserver.Utils.ErrorsTools;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.resource.NoResourceFoundException;

@ControllerAdvice
@Slf4j
public class GlobalErrorHandler {

    @Autowired
    private ErrorsTools errorsTools;

    @ExceptionHandler(Exception.class)
    public ResponseEntity<GeneralResponse> GeneralHandler(Exception e) {
        log.error(e.getMessage());
        log.error(e.getClass().toGenericString());
        return GeneralResponse.builder()
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .getResponse();
    }

    @ExceptionHandler(NoResourceFoundException.class)
    public ResponseEntity<GeneralResponse> NotFoundException(NoResourceFoundException e) {
        log.error(e.getMessage());
        log.error((e.getClass().toGenericString()));
        return GeneralResponse.builder()
                .status(HttpStatus.NOT_FOUND)
                .getResponse();
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<GeneralResponse> BadRequestException(MethodArgumentNotValidException e) {
        log.error(e.getMessage());
        log.error(e.getClass().toGenericString());
        return GeneralResponse.builder()
                .status(HttpStatus.BAD_REQUEST)
                .getResponse();
    }

}
