package com.jobportal.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.jobportal.dto.NotificationStatus;
import com.jobportal.entity.Notification;

public interface NotificationRepository extends MongoRepository<Notification, String> {
    public List<Notification> findByUserIdAndStatus(Long userId, NotificationStatus status);
}