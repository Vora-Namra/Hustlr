import axios from 'axios';
import React, { useEffect, useState } from 'react';

const base_url = "http://localhost:8080/profiles/";

const getProfile = async (id: any) => {
  try {
    const response = await axios.get(`${base_url}get/${id}`);
    return response.data;
  } catch (err: any) {
    console.error("Error fetching profile:", err.response?.data || err.message);
    throw err;
  }
};

const getProfileByApplicantId = async (applicantId: any) => {
  try {
    const response = await axios.get(`${base_url}applicant/${applicantId}`);
    return response.data;
  } catch (err: any) {
    console.error("Error fetching profile by applicantId:", err.response?.data || err.message);
    throw err;
  }
};

const updateProfile = async (profile: any) => {
  return axios.put(`${base_url}update`, profile)
    .then(res => res.data)
    .catch(err => { 
      throw err; 
    });
};

const ProfileCard = ({ applicantId }: { applicantId: any }) => {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfileByApplicantId(applicantId);
        setProfile(data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, [applicantId]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-card">
      <h2>{profile.name}</h2>
      <p>{profile.email}</p>
      {/* Add more fields as necessary */}
    </div>
  );
};

export { getProfile, getProfileByApplicantId, updateProfile, ProfileCard };
