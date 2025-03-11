package com.jobportal.jwt;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.jobportal.dto.UserDTO;
import com.jobportal.service.UserService;

@Service
public class MyUserDetailService implements UserDetailsService {

    @Autowired
    UserService userService;


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
       try{
        UserDTO dto = userService.getUserByEmail(email);
        return new CustomUserDetails(dto.getId(),dto.getEmail(),dto.getName(),dto.getPassword(),dto.getAccountType(),new ArrayList<>());
       } catch(Exception e){
         e.printStackTrace();
       }
           return null;
    }
    
}
