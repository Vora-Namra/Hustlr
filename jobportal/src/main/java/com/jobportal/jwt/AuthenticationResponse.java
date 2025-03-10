package com.jobportal.jwt;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
public class AuthenticationResponse {
    final String jwt;   

    public AuthenticationResponse(String jwt){
        this.jwt = jwt;
    }
}
