package com.jobportal.service;

import com.jobportal.dto.JobDTO;
import com.jobportal.repository.JobRepository;
import com.jobportal.utility.Utilities;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service("jobService")
public class JobServiceImpl implements JobService{
    @Autowired
    private JobRepository jobRepository;

    @Autowired
    Utilities utilities;

    @Override
    public JobDTO postJob(JobDTO jobDTO) throws Exception{
        jobDTO.setId(String.valueOf(utilities.getNextSequence("jobs")));
        jobDTO.setPostTime(LocalDateTime.now());
        return jobRepository.save(jobDTO.toEntity()).toDTO();
    }
}
