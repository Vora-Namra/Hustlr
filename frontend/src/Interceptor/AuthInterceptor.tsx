import axios from 'axios';
import { removeUser } from '../Slices/UserSlice';
import { removeJwt } from '../Slices/JwtSlice';

// Create the axios instance
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true,
});

// Add request interceptor to attach token
axiosInstance.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    
    // If token exists, add it to the headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Setup function for response interceptor
interface SetupResponseInterceptorParams {
  dispatch: (action: any) => void;
  navigate: (path: string) => void;
}

export const setupResponseInterceptor = ({ dispatch, navigate }: SetupResponseInterceptorParams): void => {
  axiosInstance.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err.response?.status === 401) {
        dispatch(removeUser());
        dispatch(removeJwt());
        localStorage.clear();
        navigate('/login');
      }
      return Promise.reject(err);
    }
  );
};

export default axiosInstance;