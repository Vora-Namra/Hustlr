package com.jobportal.service;

import com.jobportal.dto.NotificationStatus;
import com.jobportal.dto.NotificationDTO;
import com.jobportal.entity.Notification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.jobportal.utility.Utilities;

import com.jobportal.repository.NotificationRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service("notificationService")
public class NotificationServiceImpl  implements NotificationService {
    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private Utilities utilities;

    @Override
    public void sendNotification(NotificationDTO notificationDTO) throws RuntimeException {
        notificationDTO.setId(String.valueOf(utilities.getNextSequence("notification")));
        notificationDTO.setStatus(NotificationStatus.UNREAD);
        notificationDTO.setTimestamp(LocalDateTime.now());
        notificationRepository.save(notificationDTO.toEntity());
    }

    @Override
    public List<Notification> getUnreadNotifications(String userId) {
        return notificationRepository.findByUserIdAndStatus(userId, NotificationStatus.UNREAD);
    }

    @Override
    public void readNotification(String id) {
        Notification notification = notificationRepository.findById(id).orElseThrow(()->new RuntimeException("Notification not found"));
        notification.setStatus(NotificationStatus.READ);
        notificationRepository.save(notification);
    }
}