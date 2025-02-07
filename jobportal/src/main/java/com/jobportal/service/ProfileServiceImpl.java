package com.jobportal.service;

import com.jobportal.dto.ProfileDTO;
import com.jobportal.entity.Profile;
import com.jobportal.repository.ProfileRepository;
import com.jobportal.utility.Utilities;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service("profileService")
public class ProfileServiceImpl implements ProfileService {

    @Autowired
    ProfileRepository profileRepository;

    @Autowired
    Utilities utilities;

    @Override
    public String createProfile(String email) throws Exception {
        Profile profile = new Profile();
        profile.setId(String.valueOf(utilities.getNextSequence("profile")));
        profile.setEmail(email);
        profile.setSkills(new ArrayList<>());
        profile.setExperiences(new ArrayList<>());
        profile.setCertifications(new ArrayList<>());
        profileRepository.save(profile);
        return profile.getId();  // Return the profile ID to associate with the user
    }

    @Override
    public ProfileDTO getProfile(String id) throws Exception {
        return profileRepository.findById(id).orElseThrow(() -> new RuntimeException("Profile Not Found")).toDTO();
    }

    @Override
    public ProfileDTO updateProfile(ProfileDTO profileDTO) throws Exception {
        profileRepository.findById(profileDTO.getId())
                .orElseThrow(() -> new RuntimeException("Profile Not Found"));
        profileRepository.save(profileDTO.toEntity());
        return profileDTO;
    }
}
