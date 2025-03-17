import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const FoodItem = ({ item }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.image} />
        <TouchableOpacity style={styles.favoriteButton}>
          <Ionicons
            name={item.isFavorite ? 'heart' : 'heart-outline'}
            size={18}
            color={item.isFavorite ? '#FF5151' : '#000'}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.name} numberOfLines={1}>
        {item.name}
      </Text>

      <View style={styles.detailsRow}>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={14} color="#FFC107" />
          <Text style={styles.rating}>{item.rating}</Text>
        </View>
        <View style={styles.distanceContainer}>
          <MaterialIcons name="location-on" size={14} color="#ABABAB" />
          <Text style={styles.distance}>{item.distance}</Text>
        </View>
      </View>

      <Text style={styles.price}>$ {(item.price / 1000).toFixed(2)}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 15,
    padding: 8,
  },
  imageContainer: {
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 12,
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  rating: {
    fontSize: 12,
    color: '#333',
    marginLeft: 2,
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distance: {
    fontSize: 12,
    color: '#ABABAB',
    marginLeft: 2,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF8A00',
  },
});

export default FoodItem;
