
import React, { useEffect, useState } from 'react';
import axiosInstance from '../Interceptor/AuthInterceptor';


const getProfile = async (id: any) => {
  return axiosInstance.get(`/profiles/get/${id}`)
  .then(res=>res.data)
  .catch(err=>{throw err});
};

const getProfileByApplicantId = async (applicantId: any) => {
  try {
    const response = await axiosInstance.get(`/profiles/applicant/${applicantId}`);
    return response.data;
  } catch (err: any) {
    console.error("Error fetching profile by applicantId:", err.response?.data || err.message);
    throw err;
  }
};

const updateProfile = async (profile: any) => {
  return axiosInstance.put(`/profiles/update`, profile)
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

const getAllProfiles = async () => {
  return axiosInstance.get(`/profiles/getAll`)
    .then(res => res.data)
    .catch(err => { throw err; });
};

export { getProfile, getProfileByApplicantId, updateProfile, ProfileCard, getAllProfiles };
