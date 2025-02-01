package com.jobportal.service;

import com.jobportal.dto.ProfileDTO;

public interface ProfileService {
    String createProfile(String email) throws Exception;
    ProfileDTO getProfile(String id) throws Exception;
    ProfileDTO updateProfile(ProfileDTO profileDTO) throws Exception;
}
