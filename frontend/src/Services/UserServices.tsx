import axiosInstance from "../Interceptor/AuthInterceptor";

// Corrected the protocol from httpL:// to http://
const base_url = "http://localhost:8080/users/";

const registerUser = async (user: any) => {
  return axiosInstance.post(`/users/register`, user)
    .then(res => res.data)
    .catch(err => {
      throw err; 
    });
};

const loginUser = async (login: any) => {
  return axiosInstance.post(`/users/login`, login)
    .then(res => res.data)
    .catch(err => {
      throw err; 
    });
};

const sendOtp = async (email: any) => {
  return axiosInstance.post(`/users/sendOtp/${email}`)
    .then(res => res.data)
    .catch(err => {
      throw err; 
    });
};

const verifyOtp = async (email: string, otp: string) => {
  return axiosInstance.post(`/users/verifyOtp`, { email, otp }) // Send as JSON body
    .then(res => res.data)
    .catch(err => {
      throw err.response?.data || { message: "Verification failed" };
    });
};


const changePass = async (email:string,password:string)=>{
  return axiosInstance.post(`/users/changePassword`,{email,password})
  .then(res=>res.data)
  .catch(err=>{throw err});
}


export { registerUser, loginUser,sendOtp,verifyOtp,changePass };