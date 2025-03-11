package com.jobportal.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Experience {
    private String title;
    private String company;
    private String location;

    // Force MongoDB to store this as a String.
    @Field(targetType = FieldType.STRING)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MMM yyyy")
    private String startDate;

    @Field(targetType = FieldType.STRING)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MMM yyyy")
    private String endDate;

    private Boolean working;
    private String description;
}
