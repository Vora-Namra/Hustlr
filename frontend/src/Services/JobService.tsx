import axios from 'axios';

// Corrected the protocol from httpL:// to http://
const base_url = "http://localhost:8080/jobs/";

// Define TypeScript interfaces
interface Job {
    id?: string;
    title: string;
    description: string;
    salary: number;
    // Add other properties as needed
}

interface Applicant {
    name: string;
    email: string;
    resume: string; // Assuming resume is a URL or base64 string
}

interface Application {
    applicationId: string;
    status: string;
}

// Function to post a job
const postJob = async (job: Job) => {
    try {
        // Remove id if it's "0" to let backend generate it
        if (job.id === "0") {
            delete job.id;
        }

        const response = await axios.post(`${base_url}post`, job);
        return response.data;
    } catch (err: any) {
        console.error("Error posting job:", err.response?.data || err.message);
        throw err;
    }
};

// Function to get all jobs
const getAllJobs = async () => {
    return axios.get(`${base_url}getAll`)
        .then(res => res.data)
        .catch(err => { throw err; });
};

// Function to get a job by ID
const getJob = async (id: string) => {
    return axios.get(`${base_url}get/${id}`)
        .then(res => res.data)
        .catch(err => { throw err; });
};

// Function to apply for a job
const applyJob = async (id: string, applicant: Applicant) => {
    const response = await axios.post(`${base_url}apply/${id}`, applicant);
    return response.data;
};

// Function to get jobs posted by a user
const getJobPostedBy = async (id: string) => {
    return axios.get(`${base_url}postedBy/${id}`)
        .then(res => res.data)
        .catch(err => { throw err; });
};

// Function to change application status
const changeAppStatus = async (application: Application) => {
    return axios.put(`${base_url}changeAppStatus`, application)
        .then(res => res.data)
        .catch(err => { throw err; });
};

export { postJob, getAllJobs, getJob, applyJob, getJobPostedBy, changeAppStatus };
