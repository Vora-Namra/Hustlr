package com.jobportal.api; // Package matches location

import com.jobportal.dto.ResponseDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ResponseDTO> handleAllExceptions(Exception ex) {
        return new ResponseEntity<>(
                new ResponseDTO(ex.getMessage()),
                HttpStatus.INTERNAL_SERVER_ERROR
        );
    }
}
