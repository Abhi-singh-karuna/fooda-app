import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
  ImageBackground,
  ScrollView,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../styles/colors';
import DeleteCardModal from '../../components/DeleteCardModal';

const ExtraCardScreen = () => {
  const navigation = useNavigation();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleAddNewCard = () => {
    navigation.navigate('AddCardScreen');
  };

  const handleDeleteCard = (card) => {
    setSelectedCard(card);
    setDeleteModalVisible(true);
  };

  const confirmDelete = () => {
    // Handle card deletion logic here
    setDeleteModalVisible(false);
  };

  const paymentMethods = [
    {
      id: '1',
      type: 'credit',
      name: 'SoCard',
      number: '**** **** **** 8374',
      expiry: '03/30',
      cardHolder: 'Albert Stevano',
      background: 'orange',
    },
    {
      id: '2',
      type: 'credit',
      name: 'MasterCard',
      number: '**** **** 0783 7473',
      expiry: '09/25',
      cardHolder: 'Albert Stevano',
      background: 'white',
    },
    {
      id: '3',
      type: 'paypal',
      name: 'Paypal',
      number: '**** **** 0582 4672',
      logo: 'paypal',
      background: 'white',
    },
    {
      id: '4',
      type: 'applepay',
      name: 'Apple Pay',
      number: '**** **** 0582 4672',
      logo: 'apple',
      background: 'white',
    },
  ];

  const renderPaymentCard = (card) => {
    if (card.type === 'credit' && card.background === 'orange') {
      // Primary card with orange background
      return (
        <ImageBackground
          source={require('../../assets/card-background.png')}
          style={styles.cardBackground}
          imageStyle={{ borderRadius: 15 }}
        >
          <View style={styles.cardContent}>
            <Text style={styles.cardName}>{card.name}</Text>
            <Text style={styles.cardNumber}>{card.number}</Text>
            <View style={styles.cardFooter}>
              <View>
                <Text style={styles.cardFooterLabel}>Card holder name</Text>
                <Text style={styles.cardFooterValue}>{card.cardHolder}</Text>
              </View>
              <View>
                <Text style={styles.cardFooterLabel}>Expiry date</Text>
                <Text style={styles.cardFooterValue}>{card.expiry}</Text>
              </View>
              <Image
                source={require('../../assets/images/burger1.png')}
                style={styles.cardLogo}
              />
            </View>
          </View>
        </ImageBackground>
      );
    } else if (card.type === 'credit') {
      // White credit card
      return (
        <View style={styles.whiteCardContent}>
          <View style={styles.cardWithLogo}>
            <Text style={[styles.cardName, { color: '#000' }]}>
              {card.name}
            </Text>
            <Image
              source={require('../../assets/images/burger1.png')}
              style={styles.logoSmall}
            />
          </View>
          <Text style={[styles.cardNumber, { color: '#000' }]}>
            {card.number}
          </Text>
        </View>
      );
    } else {
      // Payment method card (Paypal, Apple Pay)
      return (
        <View style={styles.paymentMethodContent}>
          <View style={styles.paymentInfo}>
            <Text style={styles.paymentMethodName}>{card.name}</Text>
            <Text style={styles.paymentMethodNumber}>{card.number}</Text>
          </View>
          <View style={styles.paymentLogo}>
            {card.logo === 'paypal' ? (
              <Text style={styles.paypalLogo}>PayPal</Text>
            ) : (
              <Ionicons name="logo-apple" size={24} color="#000" />
            )}
          </View>
        </View>
      );
    }
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
        <TouchableOpacity>
          <Ionicons name="trash-outline" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.contentContainer}>
        <Text style={styles.sectionTitle}>Credit card</Text>

        {/* Primary Card */}
        <View style={styles.cardContainer}>
          {renderPaymentCard(paymentMethods[0])}
        </View>

        {/* Other Payment Methods */}
        {paymentMethods.slice(1).map((method) => (
          <TouchableOpacity
            key={method.id}
            style={styles.paymentMethodContainer}
            onPress={() => handleDeleteCard(method)}
          >
            {renderPaymentCard(method)}
          </TouchableOpacity>
        ))}

        {/* Add New Card Button */}
        <TouchableOpacity
          style={styles.addCardButton}
          onPress={handleAddNewCard}
        >
          <Text style={styles.addCardButtonText}>Add New Card</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Delete Card Confirmation Modal */}
      <DeleteCardModal
        visible={deleteModalVisible}
        onCancel={() => setDeleteModalVisible(false)}
        onConfirm={confirmDelete}
      />
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
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
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
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 15,
  },
  cardContainer: {
    marginBottom: 20,
    borderRadius: 15,
    overflow: 'hidden',
    height: 200,
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
  cardName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  cardNumber: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  cardFooterLabel: {
    fontSize: 10,
    color: '#FFFFFF',
    opacity: 0.7,
  },
  cardFooterValue: {
    fontSize: 12,
    color: '#FFFFFF',
  },
  cardLogo: {
    width: 50,
    height: 30,
    resizeMode: 'contain',
  },
  paymentMethodContainer: {
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
  },
  whiteCardContent: {
    padding: 5,
  },
  cardWithLogo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  logoSmall: {
    width: 30,
    height: 20,
    resizeMode: 'contain',
  },
  paymentMethodContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentInfo: {
    flex: 1,
  },
  paymentMethodName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  paymentMethodNumber: {
    fontSize: 14,
    color: '#666666',
  },
  paymentLogo: {
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paypalLogo: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0070BA',
  },
  addCardButton: {
    backgroundColor: colors.primary,
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  addCardButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ExtraCardScreen;
