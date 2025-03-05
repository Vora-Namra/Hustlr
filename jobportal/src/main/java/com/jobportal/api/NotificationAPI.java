package com.jobportal.api;

import com.jobportal.entity.Notification;
import com.jobportal.service.NotificationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/notification")
@Validated
public class NotificationAPI {
    private NotificationService notificationService;

    @GetMapping("get/{userId}")
    public ResponseEntity<List<Notification>>getNotification(@PathVariable Long userId){
        return new ResponseEntity<>(notificationService.getUnreadNotifications(userId), HttpStatus.OK);
    }
}
