import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ValidateOTPScreen() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(100); // 9 minutes in seconds
  const inputRefs = useRef([]);
  const navigation = useNavigation();

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  const handleOtpChange = (text, index) => {
    let newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleBackspace = (index) => {
    if (index >= 0) {
      let newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleContinue = () => {
    // Validate that the OTP contains only numeric values
    if (!/^\d+$/.test(otp.join(''))) {
      alert('Please enter a valid numeric OTP.'); // Validation message
      return;
    }

    // Proceed to the next step if validation passes
    navigation.navigate('Login'); // Replace with your next screen
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Image
            source={require('../../assets/back.png')}
            style={styles.backImage}
          />
        </TouchableOpacity>
        <Text style={styles.title}>OTP</Text>
      </View>
      <Text style={styles.subtitle}>Email verification</Text>
      <Text style={styles.description}>
        Enter the verification code we sent you on:
      </Text>
      <Text style={styles.email}>Alberts******@gmail.com</Text>
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            style={styles.otpInput}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleOtpChange(text, index)}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === 'Backspace') {
                handleBackspace(index);
              }
            }}
          />
        ))}
      </View>
      <Text style={[styles.resendText]}>
        Didn't receive code?{' '}
        <TouchableOpacity
          disabled={timer > 0}
          onPress={() => {
            /* Add resend action here */
          }}
        >
          <Text
            style={[styles.resendLink, timer === 0 ? {} : { opacity: 0.5 }]}
          >
            Resend
          </Text>
        </TouchableOpacity>
      </Text>
      <View style={styles.timerContainer}>
        <Image
          source={require('../../assets/timer.png')}
          style={styles.timerImage}
        />
        <Text style={styles.timer}>{formatTime(timer)}</Text>
      </View>

      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: '10%',
    flex: 1,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 35,
    fontWeight: 'bold',
    marginTop: 15,
  },
  description: {
    fontSize: 14,
    color: 'gray',
    marginTop: 10,
    // textAlign: 'center',
  },
  email: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
    width: '100%',
  },
  otpInput: {
    width: '14%',
    height: 60,
    borderWidth: 1,
    borderColor: 'gray',
    textAlign: 'center',
    fontSize: 18,
    borderRadius: 8,
    marginHorizontal: 2,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginTop: 40,
  },
  timerImage: {
    width: 15,
    height: 15,
    marginRight: 5,
  },
  timer: {
    fontSize: 15,
    color: 'gray',
  },
  resendText: {
    color: 'gray',
    fontSize: 14,
  },
  resendLink: {
    color: '#FE8C00',
    fontWeight: 'bold',
  },
  continueButton: {
    backgroundColor: '#FE8C00',
    padding: 15,
    borderRadius: 100,
    alignItems: 'center',
    marginTop: 20,
    width: '80%',
  },
  continueText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backImage: {
    width: 40,
    height: 40,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 60,
    justifyContent: 'space-between',
  },
});
