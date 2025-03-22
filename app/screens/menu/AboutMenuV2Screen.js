import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import BottomNavigation from '../../components/BottomNavigation';

const AboutMenuV2Screen = () => {
  const navigation = useNavigation();
  const [quantity, setQuantity] = useState(4);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About This Menu</Text>
        <TouchableOpacity>
          <Ionicons name="share-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={require('../../assets/images/burger2.png')}
          style={styles.foodImage}
          resizeMode="cover"
        />

        <View style={styles.contentContainer}>
          <View style={styles.mainInfo}>
            <View>
              <Text style={styles.foodTitle}>Burger With Meat 🍔</Text>
              <Text style={styles.foodPrice}>$ 12,330</Text>
            </View>

            <View style={styles.quantityControl}>
              <TouchableOpacity
                onPress={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <View style={styles.quantityButton}>
                  <Text style={styles.quantityButtonText}>-</Text>
                </View>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
                <View style={styles.quantityButton}>
                  <Text style={styles.quantityButtonText}>+</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Ionicons name="time-outline" size={18} color="#FF8A00" />
              <Text style={styles.infoText}>Free Delivery</Text>
            </View>

            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={18} color="#FF8A00" />
              <Text style={styles.ratingText}>4.5</Text>
            </View>
          </View>

          <View style={styles.descriptionContainer}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.descriptionText}>
              Burger With Meat is a typical food from our restaurant that is
              made. It's delicious for many people, this is very recommended for
              you.
            </Text>
          </View>

          <View style={styles.recommendedSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recommended For You</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.horizontalList}
            >
              {/* Recommended items here */}
              <View style={styles.recommendedItem}>
                <Image
                  source={require('../../assets/images/burger1.png')}
                  style={styles.recommendedImage}
                />
                <Text style={styles.recommendedName}>Ordinary Burger</Text>
                <Text style={styles.recommendedPrice}>$10,230</Text>
              </View>
              <View style={styles.recommendedItem}>
                <Image
                  source={require('../../assets/images/burger3.png')}
                  style={styles.recommendedImage}
                />
                <Text style={styles.recommendedName}>Green Burger</Text>
                <Text style={styles.recommendedPrice}>$11,230</Text>
              </View>
            </ScrollView>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={() => navigation.navigate('OrderScreen')}
        >
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>

      <BottomNavigation />
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
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  foodImage: {
    width: '100%',
    height: 250,
  },
  contentContainer: {
    padding: 16,
  },
  mainInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  foodTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  foodPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF8A00',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    marginLeft: 6,
    color: '#555',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5EB',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    marginLeft: 4,
    fontWeight: 'bold',
    color: '#FF8A00',
  },
  descriptionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  descriptionText: {
    color: '#666',
    lineHeight: 22,
  },
  recommendedSection: {
    marginBottom: 80,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  seeAllText: {
    color: '#FF8A00',
    fontSize: 14,
  },
  horizontalList: {
    flexDirection: 'row',
  },
  recommendedItem: {
    width: 120,
    marginRight: 16,
  },
  recommendedImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  recommendedName: {
    fontSize: 14,
    fontWeight: '500',
  },
  recommendedPrice: {
    fontSize: 14,
    color: '#FF8A00',
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  addToCartButton: {
    backgroundColor: '#FF8A00',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  addToCartText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AboutMenuV2Screen;
