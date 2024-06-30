package com.securifytech.securifyserver.Domain.dtos;

import com.securifytech.securifyserver.Enums.RequestState;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChangeStateDTO {

    private RequestState state;

}
