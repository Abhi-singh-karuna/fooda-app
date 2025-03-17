import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [emailError, setEmailError] = useState(false);
  const navigation = useNavigation(); // Initialize navigation

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    setEmailError(false);
  };

  const handleEmailBlur = () => {
    setEmailError(!validateEmail(email));
  };

  const navigateToHomes = () => {
    navigation.navigate('Homes');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login to your{'\n'}account.</Text>
      <Text style={styles.subtitle}>Please sign in to your account</Text>

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
          style={styles.inputPassword}
          placeholder="Enter your password"
          secureTextEntry={secureText}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setSecureText(!secureText)}>
          <FontAwesome
            name={secureText ? 'eye-slash' : 'eye'}
            size={20}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.forgotPassword}>Forgot password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signInButton}>
        <Text onPress={navigateToHomes} style={styles.signInText}>
          Sign In
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
            source={require('../../assets/google.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require('../../assets/facebook.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require('../../assets/apple.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.registerText}>
        Don't have an account?
        <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')}>
          <Text style={styles.registerLink}> Register</Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
    padding: 17,
    marginTop: 5,
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
    paddingVertical: 17,
    borderRadius: 8,
  },
  forgotPassword: {
    color: '#FE8C00',
    textAlign: 'right',
    marginVertical: 10,
  },
  signInButton: {
    backgroundColor: '#FE8C00',
    padding: 19,
    borderRadius: 100,
    alignItems: 'center',
    marginTop: 10,
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
    textAlign: 'center',
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
});
