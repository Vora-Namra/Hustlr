package com.jobportal.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Application {
    String id;
    String applicantId;
    LocalDateTime interviewTime;
    ApplicationStatus applicationStatus;
}
