import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StatusBar,
  Image,
  ImageBackground,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../styles/colors';

const AddCardScreen = () => {
  const navigation = useNavigation();
  const [cardholderName, setCardholderName] = useState(
    'Albert Stevano Bajefski',
  );
  const [cardNumber, setCardNumber] = useState('3822 8293 8292 2356');
  const [expiryDate, setExpiryDate] = useState('11/24');
  const [cvv, setCvv] = useState('');
  const [cardType, setCardType] = useState('');
  const [billingAddress, setBillingAddress] = useState('');

  const formatCardNumber = (text) => {
    // Remove all non-digit characters
    const cleaned = text.replace(/\D/g, '');

    // Format with spaces every 4 digits
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;

    setCardNumber(formatted);
  };

  const formatExpiryDate = (text) => {
    // Remove non-digit characters
    const cleaned = text.replace(/\D/g, '');

    // Format as MM/YY
    if (cleaned.length <= 2) {
      setExpiryDate(cleaned);
    } else {
      setExpiryDate(`${cleaned.substring(0, 2)}/${cleaned.substring(2, 4)}`);
    }
  };

  const handleSaveCard = () => {
    // Save card logic here
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Extra Card</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.contentContainer}>
        {/* Card Preview */}
        <View style={styles.cardPreviewContainer}>
          <ImageBackground
            source={require('../../assets/card-background.png')}
            style={styles.cardBackground}
            imageStyle={{ borderRadius: 15 }}
          >
            <View style={styles.cardContent}>
              <View style={styles.cardTypeContainer}>
                <Text style={styles.cardTypeText}>VISA</Text>
              </View>

              <Text style={styles.cardNumberPreview}>
                {cardNumber || '---- ---- ---- ----'}
              </Text>

              <View style={styles.cardFooter}>
                <View>
                  <Text style={styles.cardholderName}>
                    {cardholderName || 'YOUR NAME'}
                  </Text>
                </View>
                <View>
                  <Text style={styles.expiryDate}>{expiryDate || 'MM/YY'}</Text>
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>

        {/* Form Fields */}
        <View style={styles.formContainer}>
          <View style={styles.formField}>
            <Text style={styles.label}>Name on Card</Text>
            <TextInput
              style={styles.input}
              value={cardholderName}
              onChangeText={setCardholderName}
              placeholder="Enter Name on Card"
            />
          </View>

          <View style={styles.formField}>
            <Text style={styles.label}>Card Number</Text>
            <View style={styles.cardNumberContainer}>
              <TextInput
                style={styles.cardNumberInput}
                value={cardNumber}
                onChangeText={formatCardNumber}
                placeholder="---- ---- ---- ----"
                keyboardType="numeric"
                maxLength={19} // 16 digits + 3 spaces
              />
              <TouchableOpacity style={styles.scanIcon}>
                <Ionicons name="scan-outline" size={20} color="#777" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.formRow}>
            <View style={[styles.formField, styles.halfField]}>
              <Text style={styles.label}>Expiry Date</Text>
              <TextInput
                style={styles.input}
                value={expiryDate}
                onChangeText={formatExpiryDate}
                placeholder="MM/YY"
                keyboardType="numeric"
                maxLength={5} // MM/YY format
              />
            </View>

            <View style={[styles.formField, styles.halfField]}>
              <Text style={styles.label}>3-Digit CVV</Text>
              <TextInput
                style={styles.input}
                value={cvv}
                onChangeText={setCvv}
                placeholder="- - -"
                keyboardType="numeric"
                maxLength={3}
                secureTextEntry
              />
            </View>
          </View>

          <View style={styles.formField}>
            <Text style={styles.label}>Card Type</Text>
            <TouchableOpacity style={styles.selectInput}>
              <Text
                style={cardType ? styles.selectedText : styles.placeholderText}
              >
                {cardType || 'Select Card Type'}
              </Text>
              <Ionicons name="chevron-down" size={20} color="#000" />
            </TouchableOpacity>
          </View>

          <View style={styles.formField}>
            <Text style={styles.label}>Billing Address</Text>
            <TextInput
              style={styles.input}
              value={billingAddress}
              onChangeText={setBillingAddress}
              placeholder="Enter Address"
            />
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleSaveCard}>
            <Text style={styles.saveButtonText}>Save Card</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: '#fff',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  placeholder: {
    width: 40,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  cardPreviewContainer: {
    height: 200,
    marginBottom: 30,
    borderRadius: 15,
    overflow: 'hidden',
  },
  cardBackground: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  cardContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  cardTypeContainer: {
    alignItems: 'flex-end',
  },
  cardTypeText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },
  cardNumberPreview: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '600',
    alignSelf: 'center',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardholderName: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  expiryDate: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  formContainer: {
    marginBottom: 30,
  },
  formField: {
    marginBottom: 20,
  },
  formRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfField: {
    width: '48%',
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
  },
  cardNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 8,
    paddingHorizontal: 15,
  },
  cardNumberInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  scanIcon: {
    padding: 5,
  },
  selectInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  selectedText: {
    fontSize: 16,
    color: '#000',
  },
  placeholderText: {
    fontSize: 16,
    color: '#999',
  },
  saveButton: {
    backgroundColor: colors.primary,
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AddCardScreen;
