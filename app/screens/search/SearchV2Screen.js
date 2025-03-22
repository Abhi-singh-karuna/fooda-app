import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DrawerComponent from '../../components/DrawerComponent';
import BottomNavigation from '../../components/BottomNavigation';
import { useNavigation } from '@react-navigation/native';

const SearchV2Screen = () => {
  const navigation = useNavigation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([
    {
      id: '1',
      name: 'Burgers',
      icon: require('../../assets/images/burger1.png'),
    },
    {
      id: '2',
      name: 'Fast food',
      icon: require('../../assets/images/burger1.png'),
    },
    {
      id: '3',
      name: 'Dessert',
      icon: require('../../assets/images/burger1.png'),
    },
    {
      id: '4',
      name: 'French',
      icon: require('../../assets/images/burger1.png'),
    },
    {
      id: '5',
      name: 'Fastly',
      icon: require('../../assets/images/burger1.png'),
    },
  ]);
  const [recentSearches, setRecentSearches] = useState([
    { id: '1', name: 'Burger With Meat' },
    { id: '2', name: 'Fast Food' },
    { id: '3', name: 'Dessert' },
    { id: '4', name: 'French Fries' },
    { id: '5', name: 'Fastly' },
  ]);
  const [recentOrders, setRecentOrders] = useState([
    { id: '1', name: 'Burger With Meat', rating: '4.5', time: '10:00 AM' },
    { id: '2', name: 'Fast Food', rating: '4.2', time: '11:00 AM' },
    { id: '3', name: 'Dessert', rating: '4.7', time: '12:00 PM' },
    { id: '4', name: 'French Fries', rating: '4.3', time: '1:00 PM' },
    { id: '5', name: 'Fastly', rating: '4.8', time: '2:00 PM' },
  ]);

  const clearSearch = () => {
    setSearchQuery('');
  };

  const renderRecentSearchItem = ({ item }) => (
    <View style={styles.recentSearchItem}>
      <Text style={styles.recentSearchText}>{item.name}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Search Food</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons
            name="search"
            size={20}
            color="#888"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Food"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
              <Ionicons name="close" size={18} color="#888" />
            </TouchableOpacity>
          )}
        </View>

        {!isDrawerOpen && (
          <TouchableOpacity
            onPress={() => setIsDrawerOpen(true)}
            style={styles.filterButton}
          >
            <Ionicons name="options-outline" size={20} color="#888" />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.categoriesContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((category) => (
              <TouchableOpacity key={category.id} style={styles.categoryItem}>
                <View style={styles.categoryIconContainer}>
                  <Image source={category.icon} style={styles.categoryIcon} />
                </View>
                <Text style={styles.categoryName}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.recentSearchesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent searches</Text>
            <TouchableOpacity onPress={() => setRecentSearches([])}>
              <Text style={styles.clearAllText}>Delete</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={recentSearches}
            renderItem={renderRecentSearchItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </View>

        <View style={styles.recentOrdersSection}>
          <Text style={styles.sectionTitle}>My recent orders</Text>

          {recentOrders.map((order) => (
            <View key={order.id} style={styles.orderItem}>
              <Image source={order.image} style={styles.orderImage} />
              <View style={styles.orderInfo}>
                <Text style={styles.orderName}>{order.name}</Text>
                <View style={styles.orderRating}>
                  <Ionicons name="star" size={14} color="#FF8A00" />
                  <Text style={styles.ratingText}>{order.rating}</Text>
                  <Text style={styles.timeText}>{order.time}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {isDrawerOpen && (
        <DrawerComponent onClose={() => setIsDrawerOpen(false)} />
      )}

      <BottomNavigation />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
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
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  clearButton: {
    padding: 4,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  content: {
    flex: 1,
    paddingBottom: 60,
  },
  categoriesContainer: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 24,
  },
  categoryIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFF5EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryIcon: {
    width: 30,
    height: 30,
  },
  categoryName: {
    fontSize: 14,
    color: '#333',
  },
  recentSearchesSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  clearAllText: {
    fontSize: 14,
    color: '#FF8A00',
  },
  recentSearchItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  recentSearchLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recentSearchText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#333',
  },
  recentOrdersSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  orderImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  orderInfo: {
    flex: 1,
    marginLeft: 16,
  },
  orderName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  orderRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    color: '#888',
    marginLeft: 4,
  },
  timeText: {
    fontSize: 14,
    color: '#888',
    marginLeft: 8,
  },
});

export default SearchV2Screen;
