package com.jobportal.repository;

import com.jobportal.entity.Counter;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CounterRepository extends MongoRepository<Counter,String> {
}
