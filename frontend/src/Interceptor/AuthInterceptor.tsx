import axios from 'axios';
import { removeUser } from '../Slices/UserSlice';
import { removeJwt } from '../Slices/JwtSlice';

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


// AuthInterceptor.tsx
export const setupResponseInterceptor = (navigate: any, dispatch: any) => {
    axiosInstance.interceptors.response.use(
        (response) => response,
        (err) => {
            if (err.response?.status === 401) {
                // Clear Redux state and localStorage
                dispatch(removeUser());
                dispatch(removeJwt());
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                navigate('/login');
            }
            return Promise.reject(err);
        }
    );
};

export default axiosInstance;