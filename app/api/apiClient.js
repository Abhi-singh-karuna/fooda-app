import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Base configuration for API requests
let API_BASE_URL;

// Determine the appropriate API base URL based on the platform and environment
if (__DEV__) {
  // Development environment
  if (Platform.OS === 'android') {
    // Use this URL for Android emulator
    API_BASE_URL = 'http://10.0.2.2:8090';
  } else {
    // Use this URL for iOS simulator
    API_BASE_URL = 'http://127.0.0.1:8090';
  }
} else {
  // Production environment
  API_BASE_URL = 'https://your-production-api.com'; // Replace with your production API URL
}

// Helper function to retrieve the authentication token from AsyncStorage
const getToken = async () => {
  return await AsyncStorage.getItem('userToken'); // Fetch the user token stored in AsyncStorage
};

// Generic function to make API requests with authentication
export const apiRequest = async (endpoint, method = 'GET', data = null) => {
  const token = await getToken(); // Get the auth token

  // Set up headers for the request
  const headers = {
    'Content-Type': 'application/json', // Specify the content type as JSON
  };

  // If a token exists, include it in the headers for authorization
  if (token) {
    headers['Authorization'] = `Bearer ${token}`; // Add the token to the headers
  }

  // Configure the request options
  const config = {
    method, // HTTP method (GET, POST, etc.)
    headers, // Include the headers
  };

  // If data is provided and the method is POST, PUT, or PATCH, include the body
  if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
    config.body = JSON.stringify(data); // Convert data to JSON string
  }

  try {
    // Make the API request
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const responseData = await response.json(); // Parse the JSON response

    // Return an object containing both the status and the response data
    return {
      status: response.status,
      data: responseData,
    };
  } catch (error) {
    console.error('API request error:', error); // Log any errors that occur during the request
    throw error; // Rethrow the error for further handling
  }
};
