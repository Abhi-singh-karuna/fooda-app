import { apiRequest } from './apiClient';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Authentication API services
export const authService = {
  // Login with email and password
  login: async (email, password) => {
    const response = await apiRequest('/auth/login', 'POST', {
      email,
      password,
    });
    if (response.token) {
      await AsyncStorage.setItem('userToken', response.token);
    }
    return response;
  },

  // Register new user
  register: async (userData) => {
    return await apiRequest('/auth/register', 'POST', userData);
  },

  // Request password reset
  forgotPassword: async (email) => {
    return await apiRequest('/auth/forgot-password', 'POST', { email });
  },

  // Verify OTP for password reset
  verifyOTP: async (email, otp) => {
    return await apiRequest('/auth/verify-otp', 'POST', { email, otp });
  },

  // Reset password with token
  resetPassword: async (token, newPassword) => {
    return await apiRequest('/auth/reset-password', 'POST', {
      token,
      newPassword,
    });
  },

  // Logout - clear token
  logout: async () => {
    await AsyncStorage.removeItem('userToken');
  },
};
