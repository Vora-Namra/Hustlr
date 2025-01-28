package com.jobportal.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class ResponseDTO {
    String message;

    public ResponseDTO(String message) {
        this.message = message;
    }

    public ResponseDTO() {
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
