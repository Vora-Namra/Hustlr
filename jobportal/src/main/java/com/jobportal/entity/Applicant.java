package com.jobportal.entity;

import com.jobportal.dto.ApplicantDTO;
import com.jobportal.dto.ApplicationStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Base64;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Applicant {
    // Changed from Long to String
    private String applicantId;
    private String name;
    private String email;
    private String phone;
    private String website;
    private byte[] resume;
    private String coverLetter;
    private LocalDateTime timestamp;
    private ApplicationStatus applicationStatus;

    public ApplicantDTO toDTO() {
        return new ApplicantDTO(
                this.applicantId,
                this.name,
                this.email,
                this.phone,
                this.website,
                this.resume != null ? Base64.getEncoder().encodeToString(this.resume) : null,
                this.coverLetter,
                this.timestamp,
                this.applicationStatus
        );
    }
}
