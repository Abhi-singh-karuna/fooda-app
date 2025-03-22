import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const BottomNavigation = () => {
  const navigation = useNavigation();

  const navigateToHomes = () => {
    navigation.navigate('Homes');
  };

  const navigateToProfile = () => {
    navigation.navigate('ProfileScreen');
  };

  const isRouteActive = (routeName) => {
    const currentRoute =
      navigation.getState().routes[navigation.getState().index].name;
    return currentRoute === routeName;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => navigation.navigate('HomeScreens')}
      >
        <Ionicons
          name={isRouteActive('HomeScreen') ? 'home' : 'home-outline'}
          size={24}
          color={isRouteActive('HomeScreen') ? '#FF8A00' : '#888'}
        />
        <Text
          style={[
            styles.tabText,
            isRouteActive('HomeScreen') && styles.activeTabText,
          ]}
        >
          Home
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => navigation.navigate('SearchV1Screen')}
      >
        <Ionicons
          name={isRouteActive('SearchV1Screen') ? 'search' : 'search-outline'}
          size={24}
          color={isRouteActive('SearchV1Screen') ? '#FF8A00' : '#888'}
        />
        <Text
          style={[
            styles.tabText,
            isRouteActive('SearchV1Screen') && styles.activeTabText,
          ]}
        >
          Search
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => navigation.navigate('OrderScreen')}
      >
        <Ionicons
          name={isRouteActive('OrderScreen') ? 'cart' : 'cart-outline'}
          size={24}
          color={isRouteActive('OrderScreen') ? '#FF8A00' : '#888'}
        />
        <Text
          style={[
            styles.tabText,
            isRouteActive('OrderScreen') && styles.activeTabText,
          ]}
        >
          Orders
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => navigation.navigate('ChatListScreen')}
      >
        <Ionicons
          name={
            isRouteActive('ChatListScreen')
              ? 'chatbubble'
              : 'chatbubble-outline'
          }
          size={24}
          color={isRouteActive('ChatListScreen') ? '#FF8A00' : '#888'}
        />
        <Text
          style={[
            styles.tabText,
            isRouteActive('ChatListScreen') && styles.activeTabText,
          ]}
        >
          Chat
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => navigation.navigate('ProfileScreen')}
      >
        <Ionicons
          name={isRouteActive('ProfileScreen') ? 'person' : 'person-outline'}
          size={24}
          color={isRouteActive('ProfileScreen') ? '#FF8A00' : '#888'}
        />
        <Text
          style={[
            styles.tabText,
            isRouteActive('ProfileScreen') && styles.activeTabText,
          ]}
        >
          Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabText: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  activeTabText: {
    color: '#FF8A00',
    fontWeight: 'bold',
  },
});

export default BottomNavigation;
