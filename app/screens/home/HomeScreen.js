import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import CategoryList from '../../components/CategoryList';
import FoodItem from '../../components/FoodItem';
import BottomNavigation from '../../components/BottomNavigation';

const HomeScreen = () => {
  const [loading, setLoading] = useState(false);
  const [foodItems, setFoodItems] = useState([
    {
      id: '1',
      name: 'Ordinary Burgers',
      rating: 4.8,
      distance: '150m',
      price: 17230,
      image: require('../../assets/images/burger1.png'),
      isFavorite: false,
    },
    {
      id: '2',
      name: 'Burger With Meat',
      rating: 4.5,
      distance: '150m',
      price: 17230,
      image: require('../../assets/images/burger2.png'),
      isFavorite: false,
    },
    {
      id: '3',
      name: 'Green Burger',
      rating: 4.7,
      distance: '200m',
      price: 17230,
      image: require('../../assets/images/burger3.png'),
      isFavorite: true,
    },
    {
      id: '4',
      name: 'Double Burger',
      rating: 4.9,
      distance: '180m',
      price: 17230,
      image: require('../../assets/images/burger4.png'),
      isFavorite: false,
    },
    {
      id: '5',
      name: 'Double Burger',
      rating: 4.9,
      distance: '180m',
      price: 17230,
      image: require('../../assets/images/burger1.png'),
      isFavorite: false,
    },
    {
      id: '6',
      name: 'Double Burger',
      rating: 4.9,
      distance: '180m',
      price: 17230,
      image: require('../../assets/images/burger1.png'),
      isFavorite: false,
    },
    {
      id: '7',
      name: 'Double Burger',
      rating: 4.9,
      distance: '180m',
      price: 17230,
      image: require('../../assets/images/burger1.png'),
      isFavorite: true,
    },
    {
      id: '8',
      name: 'Double Burger',
      rating: 4.9,
      distance: '180m',
      price: 17230,
    },
    {
      id: '9',
      name: 'Double Burger',
      rating: 4.9,
      distance: '180m',
      price: 17230,
    },
    {
      id: '10',
      name: 'Double Burger',
      rating: 4.9,
      distance: '180m',
      price: 17230,
    },
    {
      id: '11',
      name: 'Double Burger',
      rating: 4.9,
      distance: '180m',
      price: 17230,
    },
    {
      id: '12',
      name: 'Double Burger',
      rating: 4.9,
      distance: '180m',
      price: 17230,
    },
    {
      id: '13',
      name: 'Double Burger',
      rating: 4.9,
      distance: '180m',
      price: 17230,
    },
    {
      id: '14',
      name: 'Double Burger',
      rating: 4.9,
      distance: '180m',
      price: 17230,
    },
    {
      id: '15',
      name: 'Double Burger',
      rating: 4.9,
      distance: '180m',
      price: 17230,
    },
  ]);
  const scrollY = useRef(new Animated.Value(0)).current; // Animated value for scroll position

  const categories = [
    { id: '1', name: 'Burger', icon: require('../../assets/icons/burger.png') },
    { id: '2', name: 'Taco', icon: require('../../assets/icons/taco.png') },
    { id: '3', name: 'Drink', icon: require('../../assets/icons/drink.png') },
    { id: '4', name: 'Pizza', icon: require('../../assets/icons/pizza.png') },
    { id: '5', name: 'Pizza', icon: require('../../assets/icons/pizza.png') },
    { id: '6', name: 'Pizza', icon: require('../../assets/icons/pizza.png') },
    { id: '7', name: 'Pizza', icon: require('../../assets/icons/pizza.png') },
  ];

  const loadMoreItems = () => {
    setLoading(true);
    // Simulate a network request
    setTimeout(() => {
      const newItems = [
        {
          id: '16',
          name: 'New Burger',
          rating: 4.5,
          distance: '200m',
          price: 17230,
          image: require('../../assets/images/burger1.png'),
          isFavorite: false,
        },
        // Add more items as needed
      ];
      setFoodItems((prevItems) => [...prevItems, ...newItems]);
      setLoading(false);
    }, 2000); // Simulate a 2-second loading time
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header and Hero Banner with Background Image */}
      <ImageBackground
        source={require('../../assets/background-home.png')}
        style={styles.background}
      >
        <Animated.View
          style={[
            styles.header,
            {
              opacity: scrollY.interpolate({
                inputRange: [0, 100],
                outputRange: [1, 0],
                extrapolate: 'clamp',
              }),
              transform: [
                {
                  translateY: scrollY.interpolate({
                    inputRange: [0, 100],
                    outputRange: [0, -100], // Adjust this value based on your header height
                    extrapolate: 'clamp',
                  }),
                },
              ],
            },
          ]}
        >
          <View style={styles.locationContainer}>
            <Text style={styles.locationLabel}>Your Location</Text>
            <View style={styles.locationRow}>
              <MaterialIcons name="location-on" size={20} color="#FFF" />
              <Text style={styles.locationText}>New York City</Text>
              <MaterialIcons
                name="keyboard-arrow-down"
                size={20}
                color="#FFF"
              />
            </View>
          </View>

          <View style={styles.headerButtons}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="search" size={22} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="notifications-outline" size={22} color="#FFF" />
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Hero Banner */}
        <View style={styles.heroBanner}>
          <Text style={styles.heroTitle}>Provide the best food for you</Text>
        </View>
      </ImageBackground>

      {/* Scrollable Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false },
        )}
        scrollEventThrottle={16}
      >
        {/* Categories Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Find by Category</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        <CategoryList categories={categories} />

        {/* Food Items Grid */}
        <View style={styles.foodGrid}>
          {foodItems.map((item) => (
            <FoodItem key={item.id} item={item} />
          ))}
        </View>

        {/* Loading Indicator */}
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FF8A00" />
          </View>
        )}
      </ScrollView>

      {/* Bottom Navigation */}
      <Animated.View
        style={[
          styles.bottomNav,
          {
            opacity: scrollY.interpolate({
              inputRange: [0, 100],
              outputRange: [1, 0],
              extrapolate: 'clamp',
            }),
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [0, 100],
                  outputRange: [0, 100], // Adjust this value based on your bottom nav height
                  extrapolate: 'clamp',
                }),
              },
            ],
          },
        ]}
      >
        <BottomNavigation />
      </Animated.View>
    </SafeAreaView>
  );
};

// Function to check if the user is close to the bottom of the scroll view
const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
  const paddingToBottom = 20; // Adjust as needed
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};

const styles = StyleSheet.create({
  background: {
    paddingBottom: 90, // Adjust as needed for spacing
    resizeMode: 'stretch', // or 'stretch'
  },
  container: {
    flex: 1,
  },
  loadingContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
  },
  locationContainer: {
    flex: 1,
  },
  locationLabel: {
    fontSize: 12,
    color: '#FFF',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 4,
    marginRight: 4,
    color: '#FFF',
  },
  headerButtons: {
    flexDirection: 'row',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  heroBanner: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    maxWidth: '70%',
    color: '#FFF',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 10,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  seeAllText: {
    color: '#FF8A00',
    fontSize: 14,
  },
  foodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 10,
  },
  bottomNav: {
    position: 'absolute',
    marginBottom: 20,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default HomeScreen;
