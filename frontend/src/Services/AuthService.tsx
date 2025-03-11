import axios from 'axios';

const base_url = "http://localhost:8080/auth/";


const loginUser = async (login: any) => {
    return axios.post(`${base_url}login`, login)
      .then(res => res.data)
      .catch(err => {
        throw err; 
      });
  };
  
  export  {loginUser};