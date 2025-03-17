import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

const CategoryList = ({ categories }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {categories.map((category) => (
        <TouchableOpacity key={category.id} style={styles.categoryItem}>
          <View style={styles.iconContainer}>
            <Image source={category.icon} style={styles.categoryIcon} />
          </View>
          <Text style={styles.categoryName}>{category.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingBottom: 15,
  },
  categoryItem: {
    alignItems: 'center',
    marginHorizontal: 4,
    width: 70,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#FFF0DC',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryIcon: {
    width: 30,
    height: 30,
    tintColor: '#FF8A00',
  },
  categoryName: {
    fontSize: 12,
    textAlign: 'center',
  },
});

export default CategoryList;
