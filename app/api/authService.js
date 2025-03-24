import { apiRequest } from './apiClient'; // Import the generic API request function
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage for token management

// Authentication API services
export const authService = {
  // Login with email and password
  login: async (email, password) => {
    // Make a POST request to the login endpoint with email and password
    const response = await apiRequest('/auth/login', 'POST', {
      email,
      password,
    });

    // If a token is received, store it in AsyncStorage
    if (response.token) {
      await AsyncStorage.setItem('userToken', response.token);
    }

    // Return the response from the API
    return response;
  },

  // Register a new user
  register: async (userData) => {
    // Make a POST request to the registration endpoint with user data
    return await apiRequest('/auth/register', 'POST', userData);
  },

  // Request a password reset
  forgotPassword: async (email) => {
    // Make a POST request to the forgot password endpoint with the user's email
    return await apiRequest('/auth/forgot-password', 'POST', { email });
  },

  // Verify OTP for password reset
  verifyOTP: async (email, otp) => {
    // Make a POST request to verify the OTP for password reset
    return await apiRequest('/auth/verify-otp', 'POST', { email, otp });
  },

  // Reset password with token
  resetPassword: async (token, newPassword) => {
    // Make a POST request to reset the password using the provided token and new password
    return await apiRequest('/auth/reset-password', 'POST', {
      token,
      newPassword,
    });
  },

  // Logout - clear the stored token
  logout: async () => {
    // Remove the user token from AsyncStorage
    await AsyncStorage.removeItem('userToken');
  },

  // Signup a new user
  signup: async (name, phoneNo, email, password) => {
    // Make a POST request to the signup endpoint with user details
    const { status, data } = await apiRequest('/signup', 'POST', {
      Name: name,
      PhoneNo: phoneNo,
      Email: email,
      Password: password,
    });

    console.log('status', status);
    console.log('data', data);

    // Check if the response contains an access token
    if (data.accessToken) {
      await AsyncStorage.setItem('userToken', data.accessToken);
      await AsyncStorage.setItem('refreshToken', data.refreshToken);
    }

    // If the response indicates an error, throw an error with the status and message
    if (data.Message) {
      console.log(data.Message);
      throw new Error(`Status: ${status}\n \nMessage: ${data.Message}`); // Include status in the error with newline
    }

    // Return the response data if successful
    return data;
  },
};
