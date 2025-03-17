import AsyncStorage from '@react-native-async-storage/async-storage';

// Base configuration for API requests
const API_BASE_URL = 'https://your-api-url.com';

// Helper function to get auth token
const getToken = async () => {
  return await AsyncStorage.getItem('userToken');
};

// Generic request function with authentication
export const apiRequest = async (endpoint, method = 'GET', data = null) => {
  const token = await getToken();

  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    method,
    headers,
  };

  if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
    config.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || 'Something went wrong');
    }

    return responseData;
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};
