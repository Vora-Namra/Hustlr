package com.jobportal.service;

import com.jobportal.dto.ProfileDTO;
import com.jobportal.entity.Profile;
import com.jobportal.entity.User;
import com.jobportal.repository.ProfileRepository;
import com.jobportal.repository.UserRepository;
import com.jobportal.utility.Utilities;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service("profileService")
public class ProfileServiceImpl implements ProfileService {

    @Autowired
    ProfileRepository profileRepository;

    @Autowired
    Utilities utilities;

    @Autowired
    UserRepository userRepository;

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
        profileRepository.findById(profileDTO.getId())
                .orElseThrow(() -> new RuntimeException("Profile Not Found"));
        profileRepository.save(profileDTO.toEntity());
        return profileDTO;
    }

    @Override
    public List<ProfileDTO> getAllProfile(){
        return profileRepository.findAll().stream().map((x)->x.toDTO()).toList();
    }

}
