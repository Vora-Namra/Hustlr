package com.jobportal.api;

import com.jobportal.dto.ResponseDTO;
import com.jobportal.entity.Notification;
import com.jobportal.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
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
    
    @Autowired
    private NotificationService notificationService;

    @GetMapping("get/{userId}")
    public ResponseEntity<List<Notification>> getNotification(@PathVariable String userId) {
        return new ResponseEntity<>(notificationService.getUnreadNotifications(userId), HttpStatus.OK);
    }

    @PutMapping("read/{id}")
    public ResponseEntity<ResponseDTO> readNotification(@PathVariable String id) {
        notificationService.readNotification(id);
        return new ResponseEntity<>(new ResponseDTO("Notification read successfully"), HttpStatus.OK);
    }
    
}
