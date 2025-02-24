package com.jobportal.api;


import com.jobportal.dto.*;
import com.jobportal.service.JobService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@Validated
@RequestMapping("/jobs")
public class JobAPI {

    @Autowired
    private JobService jobService;


    @PostMapping("/post")
    public ResponseEntity<JobDTO> postJob(@RequestBody @Valid JobDTO jobDTO) throws Exception {
        return new ResponseEntity<>(jobService.postJob(jobDTO), HttpStatus.CREATED);
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
