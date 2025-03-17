import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Modal,
  ScrollView,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [panelVisible, setPanelVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const navigation = useNavigation();

  const handleForgotPassword = () => {
    if (email.length > 0) {
      setPanelVisible(true); // Open the sliding panel
    } else {
      alert('Please enter your email address.'); // Alert if email is empty
    }
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleContinue = () => {
    if (!selectedOption) {
      alert('Please select at least one method to proceed.'); // Validation message
      return;
    }
    // Close the panel and navigate to Login page
    setPanelVisible(false);
    navigation.navigate('EmailVerification', { email });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <ScrollView contentContainerStyle={styles.innerContainer}>
        <Text style={styles.title}>Forgot password?</Text>
        <Text style={styles.description}>
          Enter your email address and we'll send you a confirmation code to
          reset your password
        </Text>

        {/* Label for Email Address */}
        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
        />
      </ScrollView>

      {/* Continue Button at the Bottom */}
      <TouchableOpacity
        style={styles.continueButton}
        onPress={handleForgotPassword}
      >
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>

      {/* Sliding Panel for Contact Options */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={panelVisible}
        onRequestClose={() => setPanelVisible(false)}
      >
        <View style={styles.panelContainer}>
          <View style={styles.panelContent}>
            <Text style={styles.panelTitle}>Forgot password?</Text>
            <Text style={styles.panelDescription}>
              Select which contact details should we use to reset your password
            </Text>

            {/* WhatsApp Option */}
            <TouchableOpacity
              style={[
                styles.optionButton,
                selectedOption === 'whatsapp' && styles.selectedOption,
              ]}
              onPress={() => handleOptionSelect('whatsapp')}
            >
              <Image
                source={require('../../assets/whatsapp.png')}
                style={styles.icon}
              />
              <View style={styles.optionTextContainer}>
                <Text style={styles.optionText}>Send via WhatsApp</Text>
                <Text style={styles.optionDetail}>+12 8347 2838 28</Text>
              </View>
              {selectedOption === 'whatsapp' && (
                <MaterialIcons name="check-circle" size={24} color="#FE8C00" />
              )}
            </TouchableOpacity>

            {/* Email Option */}
            <TouchableOpacity
              style={[
                styles.optionButton,
                selectedOption === 'email' && styles.selectedOption,
              ]}
              onPress={() => handleOptionSelect('email')}
            >
              <Image
                source={require('../../assets/email.png')}
                style={styles.icon}
              />
              <View style={styles.optionTextContainer}>
                <Text style={styles.optionText}>Send via Email</Text>
                <Text style={styles.optionDetail}>{email}</Text>
              </View>
              {selectedOption === 'email' && (
                <MaterialIcons name="check-circle" size={24} color="#FE8C00" />
              )}
            </TouchableOpacity>

            {/* Continue Button in Modal */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleContinue} // Validate selection and navigate
            >
              <Text style={styles.continueText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  innerContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingBottom: 80,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 60,
    textAlign: 'left',
  },
  description: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 30,
    textAlign: 'left',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    textAlign: 'left',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
  },
  continueButton: {
    backgroundColor: '#FE8C00',
    padding: 15,
    borderRadius: 100,
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    marginBottom: 12,
  },
  continueText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  panelContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  panelContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  panelDescription: {
    fontSize: 16,
    marginBottom: 20,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: 'lightgray',
    marginBottom: 10,
  },
  selectedOption: {
    borderColor: '#FE8C00',
    borderWidth: 2,
  },
  optionTextContainer: {
    marginLeft: 10,
    flex: 1,
  },
  optionText: {
    fontSize: 13,
    color: 'gray',
  },
  optionDetail: {
    fontSize: 14,
    marginTop: 10,
    fontWeight: '600',
  },
  icon: {
    width: 60,
    height: 60,
  },
  closeButton: {
    marginTop: 20,
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FE8C00',
    borderRadius: 25,
  },
  closeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
