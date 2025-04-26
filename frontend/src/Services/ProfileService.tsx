import axiosInstance from '../Interceptor/AuthInterceptor';


export const getProfile = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/profiles/get/${id}`);
    return response.data;
  } catch (err: any) {
    if (err.response?.status === 404) {
      return null; // Profile doesn't exist
    }
    console.error("Error fetching profile:", err.response?.data || err.message);
    throw err; // Re-throw other errors
  }
};

export const getProfileByApplicantId = async (applicantId: string) => {
  try {
    const response = await axiosInstance.get(`/profiles/applicant/${applicantId}`);
    return response.data;
  } catch (err: any) {
    console.error("Error fetching profile by applicantId:", err.response?.data || err.message);
    throw err;
  }
};

export const updateProfile = async (profile: any) => {
  try {
    const response = await axiosInstance.put(`/profiles/update`, profile);
    return response.data;
  } catch (err: any) {
    console.error("Error updating profile:", err.response?.data || err.message);
    throw err;
  }
};

export const getAllProfiles = async () => {
  try {
    const response = await axiosInstance.get(`/profiles/getAll`);
    return response.data;
  } catch (err: any) {
    console.error("Error fetching all profiles:", err.response?.data || err.message);
    throw err;
  }
};