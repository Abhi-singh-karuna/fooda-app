import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

const CategoryList = ({ categories, expanded = false }) => {
  const containerStyle = expanded ? styles.expandedContainer : styles.container;

  return (
    <View style={containerStyle}>
      <ScrollView
        horizontal={!expanded}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={
          expanded ? styles.gridContainer : styles.rowContainer
        }
      >
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
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  expandedContainer: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    height: 200,
  },
  rowContainer: {
    flexDirection: 'row',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 20,
    marginBottom: 20,
    width: 'auto',
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
});

export default CategoryList;
