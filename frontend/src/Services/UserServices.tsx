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

const sendOtp = async (email: any) => {
  return axios.post(`${base_url}sendOtp/${email}`)
    .then(res => res.data)
    .catch(err => {
      throw err; 
    });
};

const verifyOtp = async (email: string, otp: string) => {
  return axios.post(`${base_url}verifyOtp`, { email, otp }) // Send as JSON body
    .then(res => res.data)
    .catch(err => {
      throw err.response?.data || { message: "Verification failed" };
    });
};


const changePass = async (email:string,password:string)=>{
  return axios.post(`${base_url}changePassword`,{email,password})
  .then(res=>res.data)
  .catch(err=>{throw err});
}


export { registerUser, loginUser,sendOtp,verifyOtp,changePass };
