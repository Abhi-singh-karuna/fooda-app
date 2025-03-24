// app/navigation/AppNavigator.js
import React, { Suspense } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, View } from 'react-native';

// Import screens - make sure to import the welcome/HomeScreen directly
import HomeScreen from '../screens/welcome/HomeScreen';
import FirstScreen from '../screens/welcome/FirstScreen';
import SecondScreen from '../screens/welcome/SecondScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/signup/SignupScreen';
import ResetPasswordScreen from '../screens/auth/ResetPasswordScreen';
import EmailVerificationOTP from '../screens/auth/EmailVerificationOTP';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import HomeScreens from '../screens/home/HomeScreen';
import NotificationScreen from '../screens/notification/NotificationScreen';
import ProfileScreen from '../screens/profile/Profile';
import PersonalDataScreen from '../screens/profile/PersonalData';
import SettingsScreen from '../screens/profile/Settings';
import HelpCenterScreen from '../screens/profile/HelpCenter';
import ExtraCardScreen from '../screens/profile/ExtraCard';
import AddCardScreen from '../screens/profile/AddCardScreen';
import AboutMenuV1Screen from '../screens/menu/AboutMenuV1Screen';
import AboutMenuV2Screen from '../screens/menu/AboutMenuV2Screen';
import AboutMenuV3Screen from '../screens/menu/AboutMenuV3Screen';
import PaymentScreen from '../screens/payment/PaymentScreen';
import ChatListScreen from '../screens/chat/ChatListScreen';
import ChatScreen from '../screens/chat/ChatScreen';
import CallScreen from '../screens/call/CallScreen';
import SearchV1Screen from '../screens/search/SearchV1Screen';
import SearchV2Screen from '../screens/search/SearchV2Screen';
import DeliveryScreen from '../screens/delivery/DeliveryScreen';
import OrderScreen from '../screens/order/OrderScreen';
import OrderEmptyScreen from '../screens/order/OrderEmptyScreen';
import OrderV2Screen from '../screens/order/OrderV2Screen';

const Stack = createStackNavigator();

// Loading component for Suspense fallback
const LoadingComponent = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ActivityIndicator size="large" color="#0000ff" />
  </View>
);

// Main app stack - screens for all users
const MainNavigator = () => (
  <Stack.Navigator
    initialRouteName="HomeScreen"
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="HomeScreen" component={HomeScreen} />
    <Stack.Screen name="FirstScreen" component={FirstScreen} />
    <Stack.Screen name="SecondScreen" component={SecondScreen} />
    <Stack.Screen name="LoginScreen" component={LoginScreen} />
    <Stack.Screen name="SignupScreen" component={SignupScreen} />
    <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
    <Stack.Screen
      name="EmailVerificationOTP"
      component={EmailVerificationOTP}
    />
    <Stack.Screen
      name="ForgotPasswordScreen"
      component={ForgotPasswordScreen}
    />
    <Stack.Screen name="HomeScreens" component={HomeScreens} />
    <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
    <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    <Stack.Screen name="PersonalDataScreen" component={PersonalDataScreen} />
    <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
    <Stack.Screen name="HelpCenterScreen" component={HelpCenterScreen} />
    <Stack.Screen name="ExtraCardScreen" component={ExtraCardScreen} />
    <Stack.Screen name="AddCardScreen" component={AddCardScreen} />
    <Stack.Screen name="AboutMenuV1Screen" component={AboutMenuV1Screen} />
    <Stack.Screen name="AboutMenuV2Screen" component={AboutMenuV2Screen} />
    <Stack.Screen name="AboutMenuV3Screen" component={AboutMenuV3Screen} />
    <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
    <Stack.Screen name="ChatListScreen" component={ChatListScreen} />
    <Stack.Screen name="ChatScreen" component={ChatScreen} />
    <Stack.Screen name="CallScreen" component={CallScreen} />
    <Stack.Screen name="SearchV1Screen" component={SearchV1Screen} />
    <Stack.Screen name="SearchV2Screen" component={SearchV2Screen} />
    <Stack.Screen name="DeliveryScreen" component={DeliveryScreen} />
    <Stack.Screen name="OrderScreen" component={OrderScreen} />
    <Stack.Screen name="OrderEmptyScreen" component={OrderEmptyScreen} />
    <Stack.Screen name="OrderV2Screen" component={OrderV2Screen} />
  </Stack.Navigator>
);

// Main app navigator
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Suspense fallback={<LoadingComponent />}>
        <MainNavigator />
      </Suspense>
    </NavigationContainer>
  );
};

export default AppNavigator;
