import axios from 'axios';

// Corrected the protocol from httpL:// to http://
const base_url = "http://localhost:8080/jobs/";


const postJob = async (job: any) => {
    try {
      const response = await axios.post(`${base_url}post`,job);
      return response.data;
    } catch (err:any) {
      console.error("Error fetching profile:", err.response?.data || err.message);
      throw err;
    }
  };

  const getAllJobs = async()=>{
    return axios.get(`${base_url}getAll`)
    .then(res => res.data)
    .catch(err=>{throw err})
  }

  const getJob = async(id:any)=>{
    return axios.get(`${base_url}/${id}`)
    .then(res => res.data)
    .catch(err=>{throw err})
  }

  export {postJob,getAllJobs,getJob}

