import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';

const NotificationCard = ({
  title,
  description,
  date,
  image,
  color,
  isRead,
  onToggleRead,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Check if the description is not an empty string
  const hasDescription = description.trim().length > 0; // Check for non-empty description
  const shouldShowExpandIcon = hasDescription; // Show icon if description is not empty

  return (
    <View style={[styles.card, { backgroundColor: color }]}>
      <TouchableOpacity
        onPress={onToggleRead}
        style={styles.readIndicatorContainer}
      >
        {!isRead && ( // Show the green dot only if isRead is false
          <View style={styles.readIndicator} />
        )}
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>{title}</Text>
          {shouldShowExpandIcon && ( // Show the icon if there is a description
            <TouchableOpacity
              onPress={() => setIsExpanded(!isExpanded)}
              style={styles.expandIconContainer}
            >
              <Ionicons
                name={isExpanded ? 'chevron-up' : 'chevron-down'} // Change icon based on state
                size={20}
                color="#007BFF" // Icon color
              />
            </TouchableOpacity>
          )}
        </View>
        {isExpanded && ( // Show description only when expanded
          <Text style={styles.description}>{description}</Text>
        )}
        <Text style={styles.date}>{format(date, 'dd MMM yyyy')}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    flexDirection: 'row', // Ensure the card layout is horizontal
  },
  readIndicatorContainer: {
    position: 'absolute',
    top: -5,
    right: -1, // Change to right for upper right corner
  },
  readIndicator: {
    width: 15,
    height: 15,
    borderRadius: 15,
    backgroundColor: 'green', // Green dot for unread
  },
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 20,
    borderColor: '#D1D1D1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  image: {
    width: 25,
    height: 25,
    borderRadius: 70,
  },
  textContainer: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  expandIconContainer: {
    marginLeft: 10, // Space between title and icon
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  date: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
});

export default NotificationCard;
