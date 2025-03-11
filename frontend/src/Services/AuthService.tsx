
import axios from 'axios';

const base_url = "http://localhost:8080/auth/";


const loginUser = async (login: any) => {
    return axios.post(`${base_url}login`, login)
      .then(res => res.data)
      .catch(err => {
        throw err; 
      });
  };
  
 export const navigateToLogin=(navigate:any)=>{
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate("/login");
  }
  export  {loginUser};
