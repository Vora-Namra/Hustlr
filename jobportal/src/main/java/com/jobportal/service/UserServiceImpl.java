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
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service(value = "userService")
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;

    @Autowired
    OTPRepository otpRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JavaMailSender mailSender;


    @Override
    public UserDTO registerUser(UserDTO userDTO) {
        Optional<User> optional = userRepository.findByEmail(userDTO.getEmail());
        if(optional.isPresent()) try {
            throw new Exception("user registered already");
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        userDTO.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        User user = userDTO.toEntity();
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

    @Override
    public Boolean verifyOtp(String email, String otp) {
        OTP otpEntity = otpRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("OTP not found"));

        // Check if OTP is expired
        if (otpEntity.getExpiryTime().isBefore(LocalDateTime.now())) {
            otpRepository.delete(otpEntity); // Remove expired OTP
            throw new RuntimeException("OTP has expired. Request a new one.");
        }

        // Check if OTP matches
        if (!otpEntity.getOtpCode().equals(otp)) {
            throw new RuntimeException("Invalid OTP");
        }

        // OTP is verified, delete it to prevent reuse
        otpRepository.delete(otpEntity);
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


}
