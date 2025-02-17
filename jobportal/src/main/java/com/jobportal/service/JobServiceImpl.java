package com.jobportal.service;

import com.jobportal.dto.*;
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
        if(jobDTO.getId()=="0"){
            jobDTO.setId(String.valueOf(utilities.getNextSequence("jobs")));
            jobDTO.setPostTime(LocalDateTime.now());
        }else{
            Job job = jobRepository.findById(jobDTO.getId()).orElseThrow(()->new Exception("Job not Found"));
            if(job.getJobStatus().equals(JobStatus.DRAFT) || jobDTO.getJobStatus().equals(JobStatus.CLOSED))
                jobDTO.setPostTime(LocalDateTime.now());
        }
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

        if(applicants.stream().filter((x)->x.getApplicantId()==applicantDTO.getApplicantId()).toList().size()>0)throw new Exception("You have Already Applied.");

        applicantDTO.setApplicationStatus(ApplicationStatus.APPLIED);
        applicants.add(applicantDTO.toEntity());
        job.setApplicants(applicants);
        jobRepository.save(job);
    }

    @Override
    public List<JobDTO> getJobsPostedBy(String id) throws Exception {
        return jobRepository.findByPostedBy(id).stream().map((x)->x.toDTO()).toList();
    }

    @Override
    public void changeAppStatus(Application application) throws Exception {
        Job job = jobRepository.findById(application.getId())
                .orElseThrow(() -> new RuntimeException("Job Not Found"));
    
        List<Applicant> updatedApplicants = job.getApplicants().stream().map(x -> {
            if (application.getApplicantId().equals(x.getApplicantId())) {
                x.setApplicationStatus(application.getApplicationStatus());
                if (application.getApplicationStatus().equals(ApplicationStatus.INTERVIEWING)) {
                    x.setInterviewTime(application.getInterviewTime());
                }
            }
            return x;
        }).toList(); // or use .collect(Collectors.toList()) if needed
    
        job.setApplicants(updatedApplicants);
        jobRepository.save(job);
    }
    
}
