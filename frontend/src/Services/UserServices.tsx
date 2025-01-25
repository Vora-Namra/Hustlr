import axios from 'axios';

// Corrected the protocol from httpL:// to http://
const base_url = "http://localhost:8080/users/";

const registerUser = async (user: any) => {
  return axios.post(`${base_url}register`, user)
    .then(res => res.data)
    .catch(err => {
      throw err; 
    });
};

const loginUser = async (login: any) => {
  return axios.post(`${base_url}login`, login)
    .then(res => res.data)
    .catch(err => {
      throw err; 
    });
};

export { registerUser, loginUser };
