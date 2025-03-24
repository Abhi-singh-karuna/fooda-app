// Import necessary libraries and components
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { isValidEmail, isValidPassword } from '../../../utils/validation';
import CountryCodePicker from '../../../components/auth/CountryCodePicker';
import { authService } from '../../../api/authService';

// Main component for the Signup Screen
export default function SignupScreen() {
  // Navigation hook to navigate between screens
  const navigation = useNavigation();

  // State variables for managing input fields and errors
  const [email, setEmail] = useState(''); // Email input
  const [username, setUsername] = useState(''); // Username input
  const [password, setPassword] = useState(''); // Password input
  const [secureText, setSecureText] = useState(true); // Toggle for password visibility
  const [emailError, setEmailError] = useState(false); // Email validation error state
  const [passwordError, setPasswordError] = useState(false); // Password validation error state
  const [usernameError, setUsernameError] = useState(false); // New state for username error
  const [phoneError, setPhoneError] = useState(false); // New state for phone error
  const [isAgreed, setIsAgreed] = useState(false); // Checkbox for terms agreement
  const [countryCode, setCountryCode] = useState('+91'); // Default country code
  const [phoneNumber, setPhoneNumber] = useState(''); // Phone number input
  const [modalVisible, setModalVisible] = useState(false); // State for country code picker modal visibility
  const [passwordStrength, setPasswordStrength] = useState(0); // Initial strength percentage
  const [passwordColor, setPasswordColor] = useState('gray'); // Initial color
  const [isLoading, setIsLoading] = useState(false);

  // Function to validate username
  const validateUsername = (text) => {
    const isValid = /^[A-Za-z\s]+$/.test(text); // Only letters and spaces
    setUsername(text);
    setUsernameError(!isValid);
  };

  // Function to validate phone number
  const validatePhoneNumber = (text) => {
    const isValid = /^\d{10}$/.test(text); // 10-digit numeric value
    setPhoneNumber(text);
    setPhoneError(!isValid); // Set error state based on validity
  };

  // Function to validate phone number on blur
  const handlePhoneBlur = () => {
    setPhoneError(!/^\d{10}$/.test(phoneNumber)); // Set error if phone number is invalid
  };

  // Function to handle email input changes
  const handleEmailChange = (text) => {
    setEmail(text);
    setEmailError(false); // Reset email error on change
  };

  // Function to handle password input changes
  const handlePasswordChange = (text) => {
    setPassword(text);
    setPasswordError(false); // Reset password error on change
  };

  // Function to validate email on blur (when input loses focus)
  const handleEmailBlur = () => {
    setEmailError(!isValidEmail(email)); // Set error if email is invalid
  };

  // Function to validate password on blur
  const handlePasswordBlur = () => {
    setPasswordError(!isValidPassword(password)); // Set error if password is invalid
  };

  // Function to check password strength
  const getPasswordStrength = (password) => {
    let strength = { percentage: 25, color: 'red' }; // Default to weak
    if (password.length >= 8) {
      strength.percentage = 75; // Medium
      strength.color = 'yellow';
      if (/[A-Z]/.test(password) && /\d/.test(password)) {
        strength.percentage = 100; // Strong
        strength.color = 'green';
      }
    }
    return strength;
  };

  // Function to get the password strength percentage
  const getPasswordStrengthPercentage = (password) => {
    if (password.length < 8) return 25; // Very weak
    if (/[A-Z]/.test(password) && /\d/.test(password)) return 100; // Strong
    if (password.length >= 8) return 75; // Medium
    return 50; // Weak
  };

  // Function to check if all fields are valid
  const isFormValid = () => {
    return (
      username.trim() !== '' && // Check if username is not empty
      phoneNumber.trim() !== '' && // Check if phone number is not empty
      email.trim() !== '' && // Check if email is not empty
      password.trim() !== '' && // Check if password is not empty
      !usernameError &&
      !phoneError &&
      !emailError &&
      !passwordError &&
      isAgreed
    );
  };

  // Function to handle signup
  const handleSignup = async () => {
    if (isFormValid()) {
      setIsLoading(true);
      try {
        // Remove country code from phone number if needed
        const phoneNumberInt = parseInt(phoneNumber, 10);

        // Call signup API
        await authService.signup(username, phoneNumberInt, email, password);

        // On success, navigate to login screen
        Alert.alert('Success', 'Account created successfully!', [
          { text: 'OK', onPress: () => navigation.navigate('LoginScreen') },
        ]);
      } catch (error) {
        // Handle error and show the specific message from the API
        Alert.alert(
          'Registration Failed',
          error.message || 'Something went wrong', // This will show the API error message with status
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Create your new{'\n'}account.</Text>
        <Text style={styles.subtitle}>
          Create an account to start looking for the food you like
        </Text>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={[styles.input, usernameError && styles.inputError]} // Show error style if username is invalid
          placeholder="Enter your name"
          value={username}
          onChangeText={validateUsername} // Validate on change
        />
        {/* Phone Number */}
        <Text style={styles.label}>Phone Number</Text>
        <View style={styles.phoneContainer}>
          <View style={styles.countryCodeContainer}>
            <TouchableOpacity
              onPress={() => setModalVisible(true)} // Open country code picker
              style={styles.countryCodeTouchable}
            >
              <TextInput
                style={[styles.input /* Add error handling if needed */]} // Use styles.input for consistency
                value={countryCode}
                editable={false} // Country code is not editable
              />
            </TouchableOpacity>
          </View>
          <View style={styles.phoneInputContainer}>
            <TextInput
              style={[styles.input, phoneError && styles.inputError]} // Use styles.input for consistency
              placeholder="Enter your phone number" // Placeholder text
              value={phoneNumber}
              onChangeText={validatePhoneNumber} // Validate on change
              onBlur={handlePhoneBlur} // Validate on blur
            />
          </View>
        </View>
        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={[styles.input, emailError && styles.inputError]} // Show error style if email is invalid
          placeholder="Enter your email"
          value={email}
          onChangeText={handleEmailChange}
          onBlur={handleEmailBlur} // Validate on blur
          keyboardType="email-address"
        />

        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.inputPassword} // Remove error handling
            placeholder="Enter your password"
            secureTextEntry={secureText} // Toggle password visibility
            value={password}
            onChangeText={(text) => {
              handlePasswordChange(text);
              const strength = getPasswordStrength(text); // Get strength object
              setPasswordStrength(strength.percentage); // Update password strength percentage
              setPasswordColor(strength.color); // Update password strength color
            }}
            onBlur={handlePasswordBlur} // Validate on blur
          />
          <TouchableOpacity onPress={() => setSecureText(!secureText)}>
            <FontAwesome
              name={secureText ? 'eye-slash' : 'eye'} // Toggle eye icon based on visibility
              size={20}
              color="gray"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.progressBarContainer}>
          <View
            style={[
              styles.progressBar,
              { width: `${passwordStrength}%`, backgroundColor: passwordColor },
            ]}
          />
        </View>
        <View style={styles.termsContainer}>
          <TouchableOpacity
            style={[styles.checkbox, isAgreed && styles.checkboxSelected]} // Checkbox style based on agreement
            onPress={() => setIsAgreed(!isAgreed)}
          >
            {isAgreed && <FontAwesome name="check" size={16} color="white" />}
          </TouchableOpacity>
          <Text style={styles.termsText}>
            I Agree with <Text style={styles.linkText}>Terms of Service</Text>{' '}
            and <Text style={styles.linkText}>Privacy Policy</Text>
          </Text>
        </View>
        <TouchableOpacity
          style={[
            styles.signUpButton,
            (!isFormValid() || isLoading) && styles.buttonDisabled,
          ]}
          disabled={!isFormValid() || isLoading}
          onPress={handleSignup}
        >
          <Text style={styles.signInText}>
            {isLoading ? 'Processing...' : 'Register'}
          </Text>
        </TouchableOpacity>
        <View style={styles.lineContainer}>
          <View style={styles.line} />
          <Text style={styles.orText}>Or sign in with</Text>
          <View style={styles.line} />
        </View>
        <View style={styles.socialIcons}>
          <TouchableOpacity>
            <Image
              source={require('../../../assets/google.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require('../../../assets/facebook.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require('../../../assets/apple.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.registerText}>
          Already have an account?{' '}
          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={styles.registerLink}>Sign In</Text>
          </TouchableOpacity>{' '}
        </Text>
        {/* Country Code Picker Modal */}
        <CountryCodePicker
          visible={modalVisible} // Show modal based on state
          onClose={() => setModalVisible(false)} // Close modal
          onSelect={(code) => {
            setCountryCode(code); // Set selected country code
            setModalVisible(false); // Close modal
          }}
        />
      </View>
    </ScrollView>
  );
}

// Styles for the component
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    marginTop: 90,
    fontSize: 40,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 12,
    marginTop: 5,
    backgroundColor: '#f9f9f9',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 5,
  },
  inputPassword: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: 'lightgray',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  checkboxSelected: {
    backgroundColor: '#FE8C00',
    borderColor: '#FE8C00',
  },
  termsText: {
    color: 'black',
  },
  signUpButton: {
    backgroundColor: '#FE8C00',
    padding: 19,
    borderRadius: 100,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: 'lightgray',
  },
  signInText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orText: {
    textAlign: 'center',
    marginVertical: 10,
    color: 'gray',
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  icon: {
    width: 40,
    height: 40,
    marginHorizontal: 10,
  },
  registerText: {
    textAlign: 'center',
    marginTop: 20,
    color: 'gray',
  },
  registerLink: {
    color: '#FE8C00',
    fontWeight: 'bold',
  },
  inputError: {
    borderColor: 'red',
    borderWidth: 2,
  },
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  line: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    marginHorizontal: 10,
  },
  linkText: {
    color: '#FE8C00',
    fontWeight: 'bold',
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  countryCodeContainer: {
    flex: 1,
    marginRight: 10,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  countryCodeTouchable: {
    justifyContent: 'center',
  },
  countryCodeInput: {
    padding: 12,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  phoneInputContainer: {
    flex: 5,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  phoneInput: {
    padding: 12,
    fontSize: 16,
  },
  progressBarContainer: {
    height: 8,
    width: '100%',
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginTop: 5,
  },
  progressBar: {
    height: '100%',
    borderRadius: 5,
    backgroundColor: 'gray',
  },
});
