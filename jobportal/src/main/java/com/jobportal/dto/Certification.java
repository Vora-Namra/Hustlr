package com.jobportal.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.cglib.core.Local;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class Certification {
    String name;
    String issuer;
    Local issueDate;
    String certificateId;

}
