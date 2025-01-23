package com.jobportal.repository;

import com.jobportal.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User,String> {
    public Optional<User> findByEmail(String email);
}
