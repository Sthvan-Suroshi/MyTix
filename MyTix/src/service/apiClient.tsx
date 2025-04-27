import axios from 'axios';
import {BASE_URL} from './config';
import {
  getAccessToken,
  setAccessToken,
  getRefreshToken,
  clearTokens,
} from './storage';
import {navigate} from '../utils/NavigationUtils'; // Import your navigation utility

export const apiClient = axios.create({baseURL: BASE_URL});

// Request interceptor
apiClient.interceptors.request.use(
  async config => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => Promise.reject(error),
);

// Response interceptor
apiClient.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // Check if error is due to authentication (401) or authorization (403)
    if (error.response?.status === 401 || error.response?.status === 403) {
      // If we already tried refreshing, don't try again to avoid infinite loops
      if (originalRequest._retry) {
        // Clear tokens and redirect to login
        clearTokens();
        navigate('LoginScreen');
        return Promise.reject(new Error(error?.message || 'Unknown error'));
      }

      const refreshToken = getRefreshToken();

      // If no refresh token exists, redirect to login
      if (!refreshToken) {
        clearTokens();
        navigate('LoginScreen');
        return Promise.reject(error);
      }

      // Mark this request as retried
      originalRequest._retry = true;

      try {
        const {data} = await axios.post(`${BASE_URL}/user/refresh-token`, {
          refreshToken,
        });

        if (data?.accessToken) {
          setAccessToken(data.accessToken);
          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
          return axios(originalRequest);
        } else {
          // If no token received in response
          clearTokens();
          navigate('LoginScreen');
          return Promise.reject(error);
        }
      } catch (refreshError) {
        // If refresh token is invalid or expired
        clearTokens();
        navigate('LoginScreen');
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
