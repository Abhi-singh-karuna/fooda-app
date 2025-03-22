import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { isValidEmail, isValidPassword } from '../../utils/validation';
import RNPickerSelect from 'react-native-picker-select';
import CountryCodePicker from '../../components/CountryCodePicker';

export default function SignupScreen() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const [countryCode, setCountryCode] = useState('+91');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleEmailChange = (text) => {
    setEmail(text);
    setEmailError(false);
  };

  const handleUsernameChange = (text) => {
    setUsername(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    setPasswordError(false);
  };

  const handleEmailBlur = () => {
    setEmailError(!isValidEmail(email));
  };

  const handlePasswordBlur = () => {
    setPasswordError(!isValidPassword(password));
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
          style={styles.input}
          placeholder="Enter your name"
          value={username}
          onChangeText={handleUsernameChange}
        />
        {/* Phone Number */}
        <Text style={styles.label}>Phone Number</Text>
        <View style={styles.phoneContainer}>
          <View style={styles.countryCodeContainer}>
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={styles.countryCodeTouchable}
            >
              <TextInput
                style={styles.countryCodeInput}
                value={countryCode}
                editable={false}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.phoneInputContainer}>
            <TextInput
              style={styles.phoneInput}
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
          </View>
        </View>
        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={[styles.input, emailError && styles.inputError]}
          placeholder="Enter your email"
          value={email}
          onChangeText={handleEmailChange}
          onBlur={handleEmailBlur}
          keyboardType="email-address"
        />

        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.inputPassword, passwordError && styles.inputError]}
            placeholder="Enter your password"
            secureTextEntry={secureText}
            value={password}
            onChangeText={handlePasswordChange}
            onBlur={handlePasswordBlur}
          />
          <TouchableOpacity onPress={() => setSecureText(!secureText)}>
            <FontAwesome
              name={secureText ? 'eye-slash' : 'eye'}
              size={20}
              color="gray"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.termsContainer}>
          <TouchableOpacity
            style={[styles.checkbox, isAgreed && styles.checkboxSelected]}
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
          style={[styles.signUpButton, !isAgreed && styles.buttonDisabled]}
          disabled={!isAgreed}
          onPress={() => navigation.navigate('LoginScreen')}
        >
          <Text style={styles.signInText}>Register</Text>
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
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSelect={(code) => {
            setCountryCode(code);
            setModalVisible(false);
          }}
        />
      </View>
    </ScrollView>
  );
}

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
    borderWidth: 1,
    borderColor: 'gray',
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
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  phoneInput: {
    padding: 12,
    fontSize: 16,
  },
});
