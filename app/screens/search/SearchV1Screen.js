import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import BottomNavigation from '../../components/BottomNavigation';

const SearchV1Screen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('Ayam Jago');
  const [recentSearches, setRecentSearches] = useState([
    { id: '1', text: 'Burgers' },
    { id: '2', text: 'Fast food' },
    { id: '3', text: 'Dessert' },
    { id: '4', text: 'French' },
    { id: '5', text: 'Fastly' },
  ]);

  const clearSearch = () => {
    setSearchQuery('');
  };

  const renderRecentSearchItem = ({ item }) => (
    <View style={styles.recentSearchItem}>
      <View style={styles.recentSearchLeft}>
        <Ionicons name="time-outline" size={20} color="#888" />
        <Text style={styles.recentSearchText}>{item.text}</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          setRecentSearches(
            recentSearches.filter((search) => search.id !== item.id),
          );
        }}
      >
        <Ionicons name="close" size={20} color="#888" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchSection}>
        <Text style={styles.searchTitle}>Find Your Favorite Food</Text>

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
              <Ionicons name="close" size={18} color="#FFF" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.noResultsContainer}>
        <View style={styles.noResultsCircle}>
          <Ionicons name="search" size={32} color="#FF8A00" />
        </View>
        <Text style={styles.noResultsTitle}>We couldn't find any result!</Text>
        <Text style={styles.noResultsDescription}>
          Please check your search term or try another search term.
        </Text>
      </View>

      <BottomNavigation />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  searchSection: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  searchTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  clearButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#CCC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  noResultsCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFF5EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  noResultsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  noResultsDescription: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    lineHeight: 22,
  },
  recentSearchesSection: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
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
    paddingHorizontal: 16,
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
  },
});

export default SearchV1Screen;
