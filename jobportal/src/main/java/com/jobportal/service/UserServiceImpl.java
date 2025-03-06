package com.jobportal.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.jobportal.dto.LoginDTO;
import com.jobportal.dto.NotificationDTO;
import com.jobportal.dto.ResponseDTO;
import com.jobportal.dto.UserDTO;
import com.jobportal.entity.Data;
import com.jobportal.entity.OTP;
import com.jobportal.entity.User;
import com.jobportal.repository.OTPRepository;
import com.jobportal.repository.UserRepository;
import com.jobportal.utility.Utilities;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service(value = "userService")
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OTPRepository otpRepository;

    private final ProfileService profileService;

    @Autowired
    public UserServiceImpl(ProfileService profileService) {
        this.profileService = profileService;
    }

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private NotificationService notificationService;

    @Override
    public UserDTO registerUser(UserDTO userDTO) throws Exception {
        // Create the user
        User user = new User();
        user.setName(userDTO.getName());
        user.setEmail(userDTO.getEmail());

        // Encode password before saving
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));

        user.setAccountType(userDTO.getAccountType());
        user = userRepository.save(user);

        // Create a profile for the user
        String profileId = profileService.createProfile(userDTO.getEmail());  // Create profile with email

        // Associate the profile ID with the user
        user.setProfileId(profileId);

        // Save the updated user with the profileId
        user = userRepository.save(user);

        return user.toDTO();
    }

    @Override
    public UserDTO loginUser(LoginDTO loginDTO) {
        // Check if the user exists
        User user = userRepository.findByEmail(loginDTO.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Verify the password
        if (!passwordEncoder.matches(loginDTO.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        return user.toDTO();
    }

    @Override
    public Boolean sendOtp(String email) {
        try {
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            log.info("Sending OTP to: {}", email);

            String generatedOtp = Utilities.generateOTP();
            LocalDateTime expiryTime = LocalDateTime.now().plusMinutes(10); // OTP expires in 10 minutes

            // Remove any existing OTP for the user
            otpRepository.findByEmail(email).ifPresent(otpRepository::delete);

            // Save new OTP
            OTP otp = new OTP(email, generatedOtp, expiryTime);
            otpRepository.save(otp);

            log.info("Generated OTP: {}", generatedOtp);

            // Send OTP via email
            MimeMessage mm = mailSender.createMimeMessage();
            MimeMessageHelper message = new MimeMessageHelper(mm, true);
            message.setTo(email);
            message.setSubject("Your OTP Code");
            String htmlBody = Data.getMessageBody(generatedOtp, 10);
            message.setText(htmlBody, true);

            mailSender.send(mm);
            return true;

        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send email: " + e.getMessage(), e);
        } catch (Exception e) {
            throw new RuntimeException("Error in sending OTP: " + e.getMessage(), e);
        }
    }

    @Override
    public Boolean verifyOtp(String email, String otp) {
        log.info("Verifying OTP for: {} | Code: {}", email, otp);

        OTP otpEntity = otpRepository.findByEmail(email)
                .orElseThrow(() -> {
                    log.info("No OTP found for email: {}", email);
                    return new RuntimeException("OTP expired or invalid");
                });

        if (LocalDateTime.now().isAfter(otpEntity.getExpiryTime())) {
            otpRepository.delete(otpEntity);
            log.info("Expired OTP attempt for: {}", email);
            throw new RuntimeException("OTP has expired");
        }

        if (!otpEntity.getOtpCode().equals(otp.trim())) {
            log.info("Invalid OTP attempt for: {}", email);
            throw new RuntimeException("Invalid OTP code");
        }

        otpRepository.delete(otpEntity);
        log.info("OTP verified successfully for: {}", email);
        return true;
    }

    @Override
    public ResponseDTO changePassword(LoginDTO loginDTO) {
        // Fetch the user by email
        User user = userRepository.findByEmail(loginDTO.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Validate new password (optional, depending on requirements)
        validatePassword(loginDTO.getPassword());

        // Encode and save the new password
        user.setPassword(passwordEncoder.encode(loginDTO.getPassword()));
        userRepository.save(user);

        NotificationDTO noti=new NotificationDTO();
        noti.setUserId(Long.valueOf(user.getId()));
        noti.setMessage("Password Reset successfull");
        noti.setAction("Password Reset");
        notificationService.sendNotification(noti);

        // Optionally send a confirmation email or log the event
        return new ResponseDTO("Password changed successfully");
    }

    // Validate password strength
    private void validatePassword(String password) {
        if (password.length() < 8 || !password.matches(".*[!@#$%^&*()].*")) {
            throw new RuntimeException("Password must be at least 8 characters long and include a special character");
        }
    }

    @Scheduled(fixedRate = 600000) // Runs every 10 minutes
    void removeExpiredOTPs() {
        LocalDateTime expiry = LocalDateTime.now().minusMinutes(5);
        List<OTP> expiredOTPs = otpRepository.findByCreationTimeBefore(expiry);
        if (!expiredOTPs.isEmpty()) {
            otpRepository.deleteAll(expiredOTPs);
            log.info("Removed {} expired OTPs", expiredOTPs.size());
        }
    }
}
