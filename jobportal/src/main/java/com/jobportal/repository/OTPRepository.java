package com.jobportal.repository;

import com.jobportal.entity.OTP;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface OTPRepository extends MongoRepository<OTP,String> {
    Optional<OTP> findByEmail(String email);
}
