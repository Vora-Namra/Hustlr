package com.jobportal.service;

import com.jobportal.dto.ApplicantDTO;
import com.jobportal.dto.ApplicationStatus;
import com.jobportal.dto.JobDTO;
import com.jobportal.entity.Applicant;
import com.jobportal.entity.Job;
import com.jobportal.repository.JobRepository;
import com.jobportal.utility.Utilities;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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

    @Override
    public List<JobDTO> getAllJobs() throws Exception {
        return jobRepository.findAll().stream().map((x)->x.toDTO()).toList();
    }

    @Override
    public JobDTO getJob(String id) throws Exception {
        return jobRepository.findById(id).orElseThrow(()-> new RuntimeException("Job not Found")).toDTO();
    }

    @Override
    public void applyJob(String id, ApplicantDTO applicantDTO) throws Exception {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job Not Found"));

        List<Applicant> applicants = job.getApplicants();
        if (applicants == null) {
            applicants = new ArrayList<>();
        }

        boolean alreadyApplied = applicants.stream()
                .anyMatch(x -> x.getApplicantId().equals(applicantDTO.getApplicantId()));
        if (alreadyApplied) {
            throw new Exception("Job Applied Already");
        }

        applicantDTO.setApplicationStatus(ApplicationStatus.APPLIED);
        applicants.add(applicantDTO.toEntity());
        job.setApplicants(applicants);
        jobRepository.save(job);
    }


}
