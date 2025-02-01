package com.jobportal.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class Experience {
    String title;
    String company;
    String location;
    LocalDateTime startDate;
    LocalDateTime endDate;
    Boolean working;
    String description;

}
