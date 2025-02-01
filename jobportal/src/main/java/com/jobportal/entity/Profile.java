package com.jobportal.entity;

import com.jobportal.dto.Certification;
import com.jobportal.dto.Experience;
import com.jobportal.dto.ProfileDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "profiles")
public class Profile {
    @Id
    private String id;
    private String email;
    private String jobTitle;
    private String company;
    private String location;
    private String about;
    private List<String> skills;
    private List<Experience> experiences;
    private List<Certification> certifications;

    public ProfileDTO toDTO() {
        return new ProfileDTO(this.id, this.email, this.jobTitle, this.company, this.location, this.about, this.skills, this.experiences, this.certifications);
    }
}
