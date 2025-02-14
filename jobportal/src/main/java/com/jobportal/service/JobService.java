package com.jobportal.service;

import com.jobportal.dto.ApplicantDTO;
import com.jobportal.dto.Application;
import com.jobportal.dto.JobDTO;
import jakarta.validation.Valid;

import java.util.List;

public interface JobService {

   public JobDTO postJob(@Valid JobDTO jobDTO) throws Exception;

   List<JobDTO> getAllJobs() throws Exception;

   JobDTO getJob(String id) throws Exception;

   void applyJob(String id, ApplicantDTO applicantDTO) throws Exception;

    List<JobDTO> getJobsPostedBy(String id) throws Exception;


    void changeAppStatus(Application application) throws Exception;
}
