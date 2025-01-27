
package com.jobportal.api;


import com.jobportal.dto.LoginDTO;
import com.jobportal.dto.UserDTO;
import com.jobportal.entity.User;
import com.jobportal.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@Validated
@RequestMapping("/users")
public class UserAPI {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<UserDTO>  registerUser(@RequestBody UserDTO userDTO){
        userDTO = userService.registerUser(userDTO);
        return new ResponseEntity<>(userDTO, HttpStatus.CREATED);
    }


    @PostMapping("/login")
    public ResponseEntity<UserDTO> loginUser(@RequestBody @Valid LoginDTO loginDTO) {
        UserDTO userDTO = userService.loginUser(loginDTO);
        return new ResponseEntity<>(userDTO, HttpStatus.OK);
    }


//
//    @PostMapping("/register")
//    public ResponseEntity<?> register( @Valid @RequestBody UserDTO userDTO){
//        userDTO = userService.registerUser(userDTO);
//        return ResponseEntity.created(URI.create("/users/"+userDTO.getId())).body(userDTO);
//    }
}
