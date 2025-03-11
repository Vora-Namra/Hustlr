import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true, // Include credentials (cookies) in requests
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);

export default axiosInstance;