import axios from 'axios';
import useAuth from 'app/hooks/useAuth';

const axiosInstance = axios.create({
  baseURL: 'https://api-cleany-backend.herokuapp.com',
});

axiosInstance.interceptors.response.use(
  (response) => {
    return Promise.resolve(response);
  },
  (error) => {
    if (error != null && error.response.status == 401) {
      const { logout } = useAuth();
      logout();
    }
    if (error != null && error.response.status == 403) {
    }
    return Promise.reject((error.response && error.response.data) || 'Something went wrong!');
  }
);

export default axiosInstance;
