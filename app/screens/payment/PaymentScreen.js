import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const PaymentScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.orderInfoSection}>
          <Text style={styles.orderInfoText}>You ordered earlier from</Text>
          <Text style={styles.restaurantName}>Item Ordered</Text>

          <View style={styles.orderItem}>
            <Image
              source={require('../../assets/images/burger2.png')}
              style={styles.itemImage}
              resizeMode="cover"
            />
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>Burger With Meat</Text>
              <Text style={styles.itemQuantity}>x1 Items</Text>
            </View>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Details Transaction</Text>
          </View>

          <View style={styles.transactionRow}>
            <Text style={styles.transactionItem}>Cherry Healthy</Text>
            <Text style={styles.transactionPrice}>$ 100,000</Text>
          </View>
          <View style={styles.transactionRow}>
            <Text style={styles.transactionItem}>Greet</Text>
            <Text style={styles.transactionPrice}></Text>
          </View>
          <View style={styles.transactionRow}>
            <Text style={styles.transactionItem}>Tax 10%</Text>
            <Text style={styles.transactionPrice}>$ 89,300</Text>
          </View>
          <View style={styles.transactionRowTotal}>
            <Text style={styles.transactionItemTotal}>Total Price</Text>
            <Text style={styles.transactionPriceTotal}>$ 189,300</Text>
          </View>

          <View style={styles.deliverySection}>
            <Text style={styles.sectionTitle}>Deliver to :</Text>

            <View style={styles.addressField}>
              <Text style={styles.addressLabel}>Name</Text>
              <Text style={styles.addressValue}>Albert Stevano</Text>
            </View>

            <View style={styles.addressField}>
              <Text style={styles.addressLabel}>Phone No.</Text>
              <Text style={styles.addressValue}>+12523559</Text>
            </View>

            <View style={styles.addressField}>
              <Text style={styles.addressLabel}>Address</Text>
              <Text style={styles.addressValue}>New York</Text>
            </View>

            <View style={styles.addressField}>
              <Text style={styles.addressLabel}>House No.</Text>
              <Text style={styles.addressValue}>NYC60WX</Text>
            </View>

            <View style={styles.addressField}>
              <Text style={styles.addressLabel}>City</Text>
              <Text style={styles.addressValue}>New York City</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.confirmButton}>
        <Text style={styles.confirmButtonText}>Continue Now</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  orderInfoSection: {
    padding: 16,
  },
  orderInfoText: {
    fontSize: 14,
    color: '#888',
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  orderItem: {
    flexDirection: 'row',
    borderRadius: 12,
    backgroundColor: '#F8F8F8',
    padding: 12,
    marginBottom: 24,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  itemInfo: {
    marginLeft: 12,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  itemQuantity: {
    fontSize: 14,
    color: '#888',
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  transactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  transactionRowTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  transactionItem: {
    fontSize: 14,
    color: '#333',
  },
  transactionPrice: {
    fontSize: 14,
    fontWeight: '500',
  },
  transactionItemTotal: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  transactionPriceTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF8A00',
  },
  deliverySection: {
    marginTop: 24,
  },
  addressField: {
    marginVertical: 12,
  },
  addressLabel: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
  },
  addressValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  confirmButton: {
    backgroundColor: '#FF8A00',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
});

export default PaymentScreen;
