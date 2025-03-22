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
import { useNavigation } from '@react-navigation/native';
import CategoryList from '../../components/CategoryList';
import FoodItem from '../../components/FoodItem';
import BottomNavigation from '../../components/BottomNavigation';
import { LinearGradient } from 'expo-linear-gradient';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState(false);
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
      image: require('../../assets/images/burger1.png'),
      distance: '180m',
      price: 17230,
    },
    {
      id: '9',
      name: 'Double Burger',
      rating: 4.9,
      image: require('../../assets/images/burger2.png'),
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
    {
      id: '16',
      name: 'Double Burger',
      rating: 4.9,
      distance: '180m',
      price: 17230,
    },
    {
      id: '17',
      name: 'Double Burger',
      rating: 4.9,
      distance: '180m',
      price: 17230,
    },
    {
      id: '18',
      name: 'Double Burger',
      rating: 4.9,
      distance: '180m',
      price: 17230,
    },
  ]);
  const scrollY = useRef(new Animated.Value(0)).current;
  const expandAnimation = useRef(new Animated.Value(0)).current;

  const categories = [
    { id: '1', name: 'Burger', icon: require('../../assets/icons/burger.png') },
    { id: '2', name: 'Taco', icon: require('../../assets/icons/taco.png') },
    { id: '3', name: 'Drink', icon: require('../../assets/icons/drink.png') },
    { id: '4', name: 'Pizza', icon: require('../../assets/icons/pizza.png') },
    { id: '5', name: 'Pizza', icon: require('../../assets/icons/pizza.png') },
    { id: '6', name: 'Pizza', icon: require('../../assets/icons/pizza.png') },
    { id: '7', name: 'Pizza', icon: require('../../assets/icons/pizza.png') },
  ];

  const toggleCategoryExpansion = () => {
    const toValue = expandedCategories ? 0 : 1;
    Animated.timing(expandAnimation, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setExpandedCategories(!expandedCategories);
  };

  const loadMoreItems = () => {
    setLoading(true);
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
      ];
      setFoodItems((prevItems) => [...prevItems, ...newItems]);
      setLoading(false);
    }, 2000);
  };

  const categoryHeight = expandAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200],
  });

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#FF8A00', '#000000']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.6 }}
        style={styles.background}
      >
        <Animated.View
          style={[
            styles.header,
            {
              transform: [
                {
                  translateY: scrollY.interpolate({
                    inputRange: [0, 100],
                    outputRange: [0, 0],
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
              <Ionicons
                name="search"
                size={22}
                onPress={() => navigation.navigate('SearchV2Screen')}
                color="#FFF"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => navigation.navigate('NotificationScreen')}
            >
              <Ionicons name="notifications-outline" size={22} color="#FFF" />
            </TouchableOpacity>
          </View>
        </Animated.View>

        <Animated.View
          style={{
            opacity: scrollY.interpolate({
              inputRange: [0, 80],
              outputRange: [1, 0],
              extrapolate: 'clamp',
            }),
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [0, 100],
                  outputRange: [0, -50],
                  extrapolate: 'clamp',
                }),
              },
              {
                scale: scrollY.interpolate({
                  inputRange: [0, 100],
                  outputRange: [1, 0.8],
                  extrapolate: 'clamp',
                }),
              },
            ],
          }}
        >
          <View style={styles.heroBanner}>
            <Text style={styles.heroTitle}>Provide the best food for you</Text>
          </View>
        </Animated.View>
      </LinearGradient>

      <ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true, listener: () => {} },
        )}
        scrollEventThrottle={16}
        onScrollEndDrag={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent)) {
            loadMoreItems();
          }
        }}
      >
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Find by Category</Text>
          <TouchableOpacity onPress={toggleCategoryExpansion}>
            <Text style={styles.seeAllText}>
              {expandedCategories ? 'Show Less' : 'See All'}
            </Text>
          </TouchableOpacity>
        </View>

        <Animated.View
          style={{
            height: categoryHeight,
            overflow: 'hidden',
            alignSelf: 'flex-start',
          }}
        >
          <CategoryList
            categories={
              expandedCategories ? categories : categories.slice(0, 4)
            }
            expanded={expandedCategories}
          />
        </Animated.View>

        <View style={styles.foodGrid}>
          {foodItems.map((item) => (
            <FoodItem key={item.id} item={item} />
          ))}
        </View>

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FF8A00" />
          </View>
        )}
      </ScrollView>

      <Animated.View
        style={[
          styles.bottomNav,
          {
            opacity: scrollY.interpolate({
              inputRange: [0, 200],
              outputRange: [1, 0],
              extrapolate: 'clamp',
            }),
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [0, 200],
                  outputRange: [0, 100],
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

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
  const paddingToBottom = 20;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};

const styles = StyleSheet.create({
  background: {
    height: 200,
    width: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
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
    borderColor: 'rgba(255, 255, 255, 0.3)',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
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
    paddingBottom: 80,
  },
  bottomNav: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  expandedCategoryContainer: {
    paddingBottom: 10,
  },
});

export default HomeScreen;
