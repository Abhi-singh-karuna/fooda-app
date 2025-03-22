import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const { width, height } = Dimensions.get('window');

const DeliveryScreen = () => {
  const navigation = useNavigation();
  const [deliveryTime, setDeliveryTime] = useState('7-8');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: 40.7128,
            longitude: -74.006,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{ latitude: 40.7128, longitude: -74.006 }}
            title="Your Location"
            description="New York City"
          >
            <View style={styles.markerContainer}>
              <View style={styles.marker}>
                <Ionicons name="location" size={20} color="#FF8A00" />
              </View>
            </View>
          </Marker>

          <Marker
            coordinate={{ latitude: 40.7228, longitude: -73.996 }}
            title="Restaurant"
            description="Burger Joint"
          >
            <View style={styles.restaurantMarker}>
              <Ionicons name="restaurant" size={20} color="#FFF" />
            </View>
          </Marker>

          <Marker
            coordinate={{ latitude: 40.7178, longitude: -74.001 }}
            title="Delivery Driver"
          >
            <View style={styles.driverMarker}>
              <Ionicons name="bicycle" size={20} color="#FFF" />
            </View>
          </Marker>
        </MapView>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Delivered your order</Text>
          <Text style={styles.infoSubtitle}>
            Order #12345 • 2 items • $34.50
          </Text>
        </View>

        <View style={styles.zoomControls}>
          <TouchableOpacity style={styles.zoomButton}>
            <Ionicons name="add" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.zoomButton}>
            <Ionicons name="remove" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.locationButton}>
          <Ionicons name="locate" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.deliveryInfoCard}>
        <View style={styles.driverInfo}>
          <Image
            source={require('../../assets/images/avatar1.png')}
            style={styles.driverImage}
          />
          <View style={styles.driverDetails}>
            <Text style={styles.driverName}>Crisbasant Elistair</Text>
            <Text style={styles.driverStatus}>Your Delivery Man</Text>
          </View>
          <TouchableOpacity style={styles.callButton}>
            <Ionicons name="call" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.deliveryDetails}>
          <Text style={styles.deliveryLabel}>Your Delivery Time</Text>
          <Text style={styles.deliveryTime}>Estimate 2-3 • 17 Min</Text>

          <View style={styles.progressBar}>
            <View style={styles.progressFilled} />
          </View>
        </View>

        <Text style={styles.orderLabel}>Order</Text>
        <Text style={styles.orderItem}>Chinger Water 500ml</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  mapContainer: {
    height: height * 0.7,
    width: width,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  infoBox: {
    position: 'absolute',
    top: 20,
    left: 70,
    right: 20,
    backgroundColor: '#FFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoSubtitle: {
    fontSize: 12,
    color: '#888',
  },
  zoomControls: {
    position: 'absolute',
    right: 20,
    top: height * 0.3,
    backgroundColor: '#FFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  zoomButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  markerContainer: {
    alignItems: 'center',
  },
  marker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  restaurantMarker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF8A00',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  driverMarker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  deliveryInfoCard: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    marginTop: -30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    height: height * 0.3 + 30,
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  driverImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  driverDetails: {
    flex: 1,
    marginLeft: 16,
  },
  driverName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  driverStatus: {
    fontSize: 14,
    color: '#888',
  },
  callButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FF8A00',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deliveryDetails: {
    marginBottom: 20,
  },
  deliveryLabel: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
  },
  deliveryTime: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#EEE',
    borderRadius: 3,
  },
  progressFilled: {
    width: '70%',
    height: 6,
    backgroundColor: '#FF8A00',
    borderRadius: 3,
  },
  orderLabel: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
  },
  orderItem: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DeliveryScreen;
