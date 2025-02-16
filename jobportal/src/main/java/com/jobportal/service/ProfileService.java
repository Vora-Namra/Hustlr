package com.jobportal.service;

import com.jobportal.dto.ProfileDTO;
import java.util.List;

public interface ProfileService {
    String createProfile(String email) throws Exception;
    ProfileDTO getProfile(String id) throws Exception;
    ProfileDTO updateProfile(ProfileDTO profileDTO) throws Exception;
    ProfileDTO getProfileByApplicantId(String applicantId) throws Exception;

    List<ProfileDTO> getAllProfile();
}
