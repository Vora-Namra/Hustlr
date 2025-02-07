package com.jobportal.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Certification {
    private String name;
    private String issuer;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MMM yyyy") // e.g., "Aug 2023"
    private String issueDate;

    private String certificateId;
}
