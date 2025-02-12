package com.jobportal.dto;

import com.jobportal.entity.Applicant;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Base64;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApplicantDTO {
    // Changed from Long to String
    private String applicantId;
    private String name;
    private String email;
    // Optionally, if phone numbers are not used in arithmetic, consider making phone a String as well.
    private String phone;
    private String website;
    private String resume;
    private String coverLetter;
    private LocalDateTime timestamp;
    private ApplicationStatus applicationStatus;

    public Applicant toEntity() {
        return new Applicant(
                this.applicantId,
                this.name,
                this.email,
                this.phone,
                this.website,
                this.resume != null ? Base64.getDecoder().decode(this.resume) : null,
                this.coverLetter,
                this.timestamp,
                this.applicationStatus
        );
    }
}
