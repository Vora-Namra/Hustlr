package com.jobportal.api;


import com.jobportal.dto.ProfileDTO;
import com.jobportal.dto.ResponseDTO;
import com.jobportal.service.ProfileService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@Validated
@RequestMapping("/profiles")
public class ProfileAPI {

    @Autowired
    ProfileService profileService;

    @GetMapping("/get/{id}")
    public ResponseEntity<?> getProfile(@PathVariable String id) {
        try {
            ProfileDTO profile = profileService.getProfile(id);
            return ResponseEntity.ok(profile);
        } catch (Exception e) {
            if ("Profile Not Found".equals(e.getMessage())) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
            }
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
        }
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<ProfileDTO>> getAllProfile() {
            return new ResponseEntity<>(profileService.getAllProfile(),HttpStatus.OK);
        
    }

    @GetMapping("/applicant/{applicantId}")
    public ResponseEntity<?> getProfileByApplicantId(@PathVariable String applicantId) {
        try {
            ProfileDTO profile = profileService.getProfileByApplicantId(applicantId);
            return ResponseEntity.ok(profile);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PutMapping("/update")
    public ResponseEntity<ProfileDTO> updateProfile(@RequestBody ProfileDTO profileDTO) throws Exception {
        return new ResponseEntity<>(profileService.updateProfile(profileDTO), HttpStatus.OK);
    }
}