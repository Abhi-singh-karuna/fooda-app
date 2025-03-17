import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

export default function ResetPasswordScreen() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  // const navigation = useNavigation();

  const handleResetPassword = () => {
    if (newPassword === confirmPassword && newPassword.length >= 0) {
      setModalVisible(true);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <View style={styles.innerContainer}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require('./assets/back.png')} style={styles.backImage} />
          </TouchableOpacity>
          <Text style={styles.title}>Reset Password</Text>
        </View>

        <Text style={styles.subtitle}>Reset Password</Text>
        <Text style={styles.description}>
          Your new password must be different from the previously used password
        </Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="New Password"
            secureTextEntry={!showNewPassword}
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowNewPassword(!showNewPassword)}>
            <FontAwesome name={showNewPassword ? 'eye' : 'eye-slash'} size={24} color="gray" />
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry={!showConfirmPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
            <FontAwesome name={showConfirmPassword ? 'eye' : 'eye-slash'} size={24} color="gray" />
          </TouchableOpacity>
        </View>

        {newPassword !== confirmPassword && confirmPassword.length > 0 && (
          <Text style={styles.errorText}>Passwords do not match</Text>
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.continueButton} onPress={handleResetPassword}>
            <Text style={styles.continueText}>Reset Password</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Success Modal */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image source={require('./assets/success.png')} style={styles.successIcon} />
            <Text style={styles.modalTitle}>Password Changed</Text>
            <Text style={styles.modalMessage}>
              Password changed successfully, you can login {'\n'} again with a new password.
            </Text>
            <TouchableOpacity
              style={styles.verifyButton}
              onPress={() => {
                setModalVisible(false);
                // navigation.navigate('Login'); // Navigate to Login
              }}
            >
              <Text style={styles.verifyText}>Verify Account</Text>
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
  },
  innerContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 60,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    marginRight: 40,
  },
  subtitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
    position: 'relative',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: 12,
  },
  continueButton: {
    backgroundColor: '#FE8C00',
    padding: 15,
    borderRadius: 100,
    alignItems: 'center',
    marginBottom: 20,
  },
  continueText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginTop: -10,
    marginBottom: 10,
  },
  backImage: {
    width: 40,
    height: 40,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '100%',
    padding: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
  },
  successIcon: {
    width: 230,
    height: 230,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 55,
  },
  modalMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  verifyButton: {
    backgroundColor: '#FE8C00',
    padding: 12,
    borderRadius: 25,
    width: '90%',
    // height:50,
    alignItems: 'center',
  },
  verifyText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',

  },
});
