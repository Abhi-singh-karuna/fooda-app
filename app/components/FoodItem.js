import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const FoodItem = ({ item }) => {
  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = useState(item.isFavorite || false);
  
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  
  const formatPrice = (price) => {
    return `$ ${(price / 1000).toFixed(3)}`;
  };
  
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => navigation.navigate('AboutMenuV1Screen', { item })}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={item.image} 
          style={styles.image}
          resizeMode="cover"
        />
        
        <TouchableOpacity 
          style={styles.favoriteButton} 
          onPress={toggleFavorite}
        >
          <Ionicons 
            name={isFavorite ? "heart" : "heart-outline"} 
            size={18} 
            color={isFavorite ? "#FF4B4B" : "#FFF"} 
          />
        </TouchableOpacity>
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
        
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={14} color="#FF8A00" />
          <Text style={styles.rating}>{item.rating}</Text>
          {item.distance && (
            <Text style={styles.distance}>• {item.distance}</Text>
          )}
        </View>
        
        <Text style={styles.price}>{formatPrice(item.price)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '48%',
    marginBottom: 16,
    backgroundColor: '#FFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    padding: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  rating: {
    fontSize: 12,
    color: '#888',
    marginLeft: 4,
  },
  distance: {
    fontSize: 12,
    color: '#888',
    marginLeft: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF8A00',
  },
});

export default FoodItem;
