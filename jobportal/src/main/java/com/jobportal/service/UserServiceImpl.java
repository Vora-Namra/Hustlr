package com.jobportal.service;

import com.jobportal.dto.LoginDTO;
import com.jobportal.dto.UserDTO;
import com.jobportal.entity.User;
import com.jobportal.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service(value = "userService")
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;


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
    public UserDTO loginUser(LoginDTO loginDTO)  {
        User user = userRepository.findByEmail(loginDTO.getEmail()).orElseThrow();
        if(!passwordEncoder.matches(loginDTO.getPassword(),user.getPassword()));
        return user.toDTO();
    }
}
