package com.jobportal.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document(collection = "otp")
public class OTP {

    String email;
    String otpCode;
    LocalDateTime creationTime;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getOtpCode() {
        return otpCode;
    }

    public void setOtpCode(String otpCode) {
        this.otpCode = otpCode;
    }

    public LocalDateTime getCreationTime() {
        return creationTime;
    }

    public void setCreationTime(LocalDateTime creationTime) {
        this.creationTime = creationTime;
    }

    public OTP() {
    }

    public OTP(String email, String otpCode, LocalDateTime creationTime) {
        this.email = email;
        this.otpCode = otpCode;
        this.creationTime = creationTime;
    }
}
