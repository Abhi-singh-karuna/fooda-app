// app/navigation/AppNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'; // Ensure proper initialization
import { useAuth } from '../hooks/useAuth';

// Import screens
import HomeScreen from '../screens/welcome/HomeScreen';
import FirstScreen from '../screens/welcome/FirstScreen';
import SecondScreen from '../screens/welcome/SecondScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import ResetPasswordScreen from '../screens/auth/ResetPasswordScreen';
import EmailVerificationOTP from '../screens/auth/EmailVerificationOTP';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import HomeScreens from '../screens/home/HomeScreen';
const Stack = createStackNavigator();

// Auth stack - screens for not authenticated users
const AuthNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="FirstScreen" component={FirstScreen} />
    <Stack.Screen name="SecondScreen" component={SecondScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="SignupScreen" component={SignupScreen} />
    <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
    <Stack.Screen name="EmailVerification" component={EmailVerificationOTP} />
    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    <Stack.Screen name="Homes" component={HomeScreens} />
  </Stack.Navigator>
);

// Main app navigator - conditionally renders based on auth state
const AppNavigator = () => {
  const { user, loading } = useAuth();

  // You could add a loading screen here
  if (loading) {
    return null; // Or a loading component
  }

  // For now, we'll just use the auth stack since you don't have main app screens yet
  return <AuthNavigator />;
};

export default AppNavigator;
