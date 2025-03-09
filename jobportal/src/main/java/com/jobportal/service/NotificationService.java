package com.jobportal.service;

import com.jobportal.dto.NotificationDTO;
import com.jobportal.entity.Notification;

import java.util.List;

public interface NotificationService {
    public void sendNotification(NotificationDTO notificationDTO) throws RuntimeException;
    public List<Notification> getUnreadNotifications(String userId);
}