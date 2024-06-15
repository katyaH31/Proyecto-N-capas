package com.securifytech.securifyserver.Utils;

import org.springframework.stereotype.Component;
import org.springframework.validation.FieldError;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class ErrorsTools {
    public Map<String, List<String>> mapErrors(List<FieldError> errors) {
        Map<String, List<String>> errosMap = new HashMap<>();
        errors.forEach(
                error -> {
                    List<String> _errors = errosMap
                            .getOrDefault(error.getField(), new ArrayList<>());
                    _errors.add(error.getDefaultMessage());
                    errosMap.put(error.getField(), _errors);
                }
        );
        return errosMap;
    }
}
