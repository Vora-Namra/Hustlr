package com.jobportal.service;

import com.jobportal.dto.LoginDTO;
import com.jobportal.dto.ResponseDTO;
import com.jobportal.dto.UserDTO;
import jakarta.validation.Valid;

public interface UserService {
    public UserDTO registerUser(UserDTO userDTO) throws Exception;

    public UserDTO loginUser(LoginDTO loginDTO) ;

    public Boolean sendOtp(String email) throws Exception;

    public Boolean verifyOtp(String email,String otp) throws Exception;

    ResponseDTO changePassword(@Valid LoginDTO loginDTO);
}