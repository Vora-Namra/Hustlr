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

    @Override
    public void sendNotification(NotificationDTO notificationDTO) throws RuntimeException {
        notificationDTO.setId(Utilities.getNextSequence("notification"));
        notificationDTO.setStatus(NotificationStatus.UNREAD);
        notificationDTO.setTimestamp(LocalDateTime.now());
        notificationRepository.save(notificationDTO.toEntity());
    }

    @Override
    public List<Notification> getUnreadNotifications(Long userId) {
        return notificationRepository.findByUserIdAndStatus(userId, NotificationStatus.UNREAD);
    }
}
