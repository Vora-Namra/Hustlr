
package com.jobportal.dto;

import com.jobportal.entity.User;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserDTO {

    private String id;

    @NotBlank(message = "Name can not be null")
    private String name;

    @Email(message = "Email is Invalid")
    @NotBlank(message = "Email can not be null")
    private String email;

    @NotBlank(message = "Password can not be null")
    private String password;
    private AccountType accountType;
    private String profileId;

    public UserDTO(String id, String name, String email, String password, AccountType accountType, String profileId) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.accountType = accountType;
        this.profileId = profileId;
    }

    public User toEntity() {
        return new User(this.id, this.name, this.email, this.password, this.accountType, this.profileId);
    }
}
