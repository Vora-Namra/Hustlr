
package com.jobportal.api;


import com.jobportal.dto.LoginDTO;
import com.jobportal.dto.ResponseDTO;
import com.jobportal.dto.UserDTO;
import com.jobportal.entity.User;
import com.jobportal.service.UserService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
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

    @PostMapping("/sendOtp/{email}")
    public ResponseEntity<ResponseDTO> sendOtp(@PathVariable @Email(message="{user.email.invalid}") String email) throws Exception {
        userService.sendOtp(email);
        return new ResponseEntity<>(new ResponseDTO("OTP Sent Successfully!"),HttpStatus.OK);
    }

    @GetMapping("/verifyotp/{email}/{otp}")
    public ResponseEntity<ResponseDTO> verifyOtp(@PathVariable @Email(message="email is invalid") String email,@PathVariable @Pattern(regexp = "^[0-9]{6}$" ,message="otp is invalid") String otp) throws Exception {
        userService.verifyOtp(email,otp);
        return new ResponseEntity<>(new ResponseDTO("OTP has been Verified!"),HttpStatus.OK);
    }


    @PostMapping("/changePassword")
    public ResponseEntity<ResponseDTO> changePassword(@RequestBody @Valid LoginDTO loginDTO) {
        return new ResponseEntity<>(userService.changePassword(loginDTO), HttpStatus.OK);
    }



//
//    @PostMapping("/register")
//    public ResponseEntity<?> register( @Valid @RequestBody UserDTO userDTO){
//        userDTO = userService.registerUser(userDTO);
//        return ResponseEntity.created(URI.create("/users/"+userDTO.getId())).body(userDTO);
//    }
}
