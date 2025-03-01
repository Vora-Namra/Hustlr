package com.jobportal.api;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.jobportal.dto.ApplicantDTO;
import com.jobportal.dto.Application;
import com.jobportal.dto.JobDTO;
import com.jobportal.dto.ResponseDTO;
import com.jobportal.service.JobService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@Validated
@RequestMapping("/jobs")
public class JobAPI {

    @Autowired
    private JobService jobService;


    @PostMapping("/post")
    public ResponseEntity<JobDTO> postJob(@RequestBody @Valid JobDTO jobDTO) throws Exception {
        try {
            JobDTO savedJob = jobService.postJob(jobDTO);
            return new ResponseEntity<>(savedJob, HttpStatus.CREATED);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }
    
    
        @GetMapping("/getAll")
        public ResponseEntity<List<JobDTO>> getAllJobs() throws Exception {
            return new ResponseEntity<>(jobService.getAllJobs(),HttpStatus.OK);
        }
    
        @GetMapping("/get/{id}")
        public ResponseEntity<JobDTO> getJob(@PathVariable String id) throws Exception {
            return new ResponseEntity<>(jobService.getJob(id),HttpStatus.OK);
        }
    
        @PostMapping("/apply/{id}")
        public ResponseEntity<ResponseDTO> applyJob(@PathVariable String id, @RequestBody ApplicantDTO applicantDTO) throws Exception {
            jobService.applyJob(id,applicantDTO);
            return new ResponseEntity<>(new ResponseDTO("Applied Successfully."), HttpStatus.CREATED);
        }
        @GetMapping("/postedBy/{id}")
        public ResponseEntity<List<JobDTO>> getJobsPostedBys(@PathVariable String id) throws Exception {
            return new ResponseEntity<>(jobService.getJobsPostedBy(id),HttpStatus.OK);
        }
    
        // JobAPI.java
    @PutMapping("/changeAppStatus")
    public ResponseEntity<?> changeAppStatus(@RequestBody Application application) {
        try {
            jobService.changeAppStatus(application);
            return ResponseEntity.ok(new ResponseDTO("Status updated"));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
    }
    }
    }    