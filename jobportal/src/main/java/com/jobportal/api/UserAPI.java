package com.jobportal.api;


import com.jobportal.dto.UserDTO;
import com.jobportal.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@CrossOrigin
@RequestMapping("/users")
public class UserAPI {

    @Autowired
    private UserService userService;

//    @PostMapping("/register")
//    public ResponseEntity<UserDTO>  registerUser(@RequestBody UserDTO userDTO){
//        userDTO = userService.registerUser(userDTO);
//        return new ResponseEntity<>(userDTO, HttpStatus.CREATED);
//    }


    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserDTO userDTO){
        userDTO = userService.registerUser(userDTO);
        return ResponseEntity.created(URI.create("/users/"+userDTO.getId())).body(userDTO);
    }
}
