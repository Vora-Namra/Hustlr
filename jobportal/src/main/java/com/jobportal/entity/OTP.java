package com.jobportal.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "otp") // Ensure this is stored in MongoDB
public class OTP {

    @Id  // Primary Key
    private String email;
    private String otpCode;
    private LocalDateTime expiryTime;

    public OTP(String email, String otpCode, LocalDateTime expiryTime) {
        this.email = email;
        this.otpCode = otpCode;
        this.expiryTime = expiryTime;
    }

    // Getters and Setters
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getOtpCode() { return otpCode; }
    public void setOtpCode(String otpCode) { this.otpCode = otpCode; }

    public LocalDateTime getExpiryTime() { return expiryTime; }
    public void setExpiryTime(LocalDateTime expiryTime) { this.expiryTime = expiryTime; }
}
