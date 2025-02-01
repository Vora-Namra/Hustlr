
package com.jobportal.service;

import com.jobportal.dto.LoginDTO;
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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service(value = "userService")
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;

    @Autowired
    OTPRepository otpRepository;

    private final ProfileService profileService;

    @Autowired
    public UserServiceImpl(ProfileService profileService) {
        this.profileService = profileService;
    }

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JavaMailSender mailSender;

    @Override
    public UserDTO registerUser(UserDTO userDTO) throws Exception {
        // Create the user
        User user = new User();
        user.setName(userDTO.getName());
        user.setEmail(userDTO.getEmail());
        user.setPassword(userDTO.getPassword());
        user.setAccountType(userDTO.getAccountType());
        user = userRepository.save(user);

        // Create a profile for the user
        String profileId = profileService.createProfile(user.getEmail());  // Create profile with email

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

            System.out.println("Sending OTP to: " + email);

            String generatedOtp = Utilities.generateOTP();
            LocalDateTime expiryTime = LocalDateTime.now().plusMinutes(10); // OTP expires in 10 minutes

            // Remove any existing OTP for the user
            otpRepository.findByEmail(email).ifPresent(otpRepository::delete);

            // Save new OTP
            OTP otp = new OTP(email, generatedOtp, expiryTime);
            otpRepository.save(otp);

            System.out.println("Generated OTP: " + generatedOtp);

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

    // UserServiceImpl.java - Add OTP validation enhancements
    @Override
public Boolean verifyOtp(String email, String otp) {
        System.out.println("Verifying OTP for: {} | Code: {}"+email+ otp);

    OTP otpEntity = otpRepository.findByEmail(email)
            .orElseThrow(() -> {
                System.out.println("No OTP found for email: {}"+ email);
                return new RuntimeException("OTP expired or invalid");
            });

    if (LocalDateTime.now().isAfter(otpEntity.getExpiryTime())) {
        otpRepository.delete(otpEntity);
        System.out.println("Expired OTP attempt for: {}"+ email);
        throw new RuntimeException("OTP has expired");
    }

    if (!otpEntity.getOtpCode().equals(otp.trim())) {
        System.out.println("Invalid OTP attempt for: {}"+ email);
        throw new RuntimeException("Invalid OTP code");
    }

    otpRepository.delete(otpEntity);
        System.out.println("OTP verified successfully for: {}"+ email);
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
    void removeExpiredOTPs(){
        LocalDateTime expiry = LocalDateTime.now().minusMinutes(5);
        List<OTP> expiredOTPs = otpRepository.findByCreationTimeBefore(expiry);
        if(!expiredOTPs.isEmpty()){
            otpRepository.deleteAll(expiredOTPs);
            System.out.println("Removed "+expiredOTPs.size() + " expired OTPs");
        }
    }



}
