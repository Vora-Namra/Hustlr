package com.jobportal.service;

import com.jobportal.dto.ProfileDTO;
import com.jobportal.entity.Profile;
import com.jobportal.entity.User;
import com.jobportal.repository.ProfileRepository;
import com.jobportal.repository.UserRepository;
import com.jobportal.utility.Utilities;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.List;

@Service("profileService")
public class ProfileServiceImpl implements ProfileService {

    private static final Logger log = LoggerFactory.getLogger(ProfileServiceImpl.class);

    @Autowired
    ProfileRepository profileRepository;

    @Autowired
    Utilities utilities;

    @Autowired
    UserRepository userRepository;

    @Override
    public String createProfile(String email) throws Exception {
        // Find user by email to get their name
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new Exception("User not found"));

        Profile profile = new Profile();
        profile.setId(String.valueOf(utilities.getNextSequence("profile")));
        profile.setEmail(email);
        profile.setName(user.getName()); // Set the user's name
        profile.setSkills(new ArrayList<>());
        profile.setExperiences(new ArrayList<>());
        profile.setCertifications(new ArrayList<>());
        profile.setSavedJobs(new ArrayList<>());
        
        // Initialize other fields with empty values
        profile.setJobTitle("");
        profile.setCompany("");
        profile.setLocation("");
        profile.setAbout("");
        profile.setTotalExp(0L);

        profileRepository.save(profile);
        log.info("Created profile for user: {} with name: {}", email, user.getName());
        
        return profile.getId();
    }

    @Override
    public ProfileDTO getProfileByApplicantId(String applicantId) throws Exception {
        User user = userRepository.findById(applicantId)
                .orElseThrow(() -> new Exception("User not found"));
        if (user.getProfileId() == null) {
            throw new Exception("User does not have a profile");
        }
        return profileRepository.findById(user.getProfileId())
                .orElseThrow(() -> new Exception("Profile not found")).toDTO();
    }

    @Override
    public ProfileDTO getProfile(String id) throws Exception {
        return profileRepository.findById(id).orElseThrow(() -> new RuntimeException("Profile Not Found")).toDTO();
    }

    @Override
    public ProfileDTO updateProfile(ProfileDTO profileDTO) throws Exception {
        Profile existingProfile = profileRepository.findById(profileDTO.getId())
                .orElseThrow(() -> new RuntimeException("Profile Not Found"));

        // Update the existing profile with new values
        Profile updatedProfile = profileDTO.toEntity();
        updatedProfile = profileRepository.save(updatedProfile);
        
        // Log the update
        log.info("Profile updated successfully for ID: {}", profileDTO.getId());
        
        return updatedProfile.toDTO();
    }

    @Override
    public List<ProfileDTO> getAllProfile(){
        return profileRepository.findAll().stream().map((x)->x.toDTO()).toList();
    }

}
