package com.jobportal.jwt;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.jobportal.dto.AccountType;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomUserDetails implements UserDetails {
    
    
    private String id;
    private String username;
    private String name;
    private String password;
    private AccountType accountType;
    private Collection<?extends GrantedAuthority>authorities;
}
