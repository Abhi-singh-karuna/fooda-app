import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const BottomNavigation = () => {
  const navigation = useNavigation();

  const navigateToHomes = () => {
    navigation.navigate('Homes');
  };

  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity style={styles.navItem} onPress={navigateToHomes}>
        <Ionicons name="home" size={24} color="#FF8A00" />
        <Text style={[styles.navText, styles.activeNavText]}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem}>
        <Ionicons name="lock-closed-outline" size={24} color="#ABABAB" />
        <Text style={styles.navText}>Secure</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem}>
        <Ionicons name="chatbubble-outline" size={24} color="#ABABAB" />
        <Text style={styles.navText}>Chat</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem}>
        <Ionicons name="person-outline" size={24} color="#ABABAB" />
        <Text style={styles.navText}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#ABABAB',
    marginTop: 4,
  },
  activeNavText: {
    color: '#FF8A00',
  },
});

export default BottomNavigation;
