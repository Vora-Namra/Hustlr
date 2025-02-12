import axios from 'axios';

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

const updateProfile = async (profile: any) => {
  return axios.put(`${base_url}update`, profile)
    .then(res => res.data)
    .catch(err => { 
      throw err; 
    });
};

export { getProfile, updateProfile };
