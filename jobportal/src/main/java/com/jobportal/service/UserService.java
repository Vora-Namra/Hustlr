package com.jobportal.service;

import com.jobportal.dto.LoginDTO;
import com.jobportal.dto.UserDTO;

public interface UserService {
    public UserDTO registerUser(UserDTO userDTO);

   public UserDTO loginUser(LoginDTO loginDTO) ;
}
