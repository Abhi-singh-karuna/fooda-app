import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../styles/colors';
import SignOutModal from '../../components/SignOutModal';
import BottomNavigation from '../../components/BottomNavigation';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [signOutModalVisible, setSignOutModalVisible] = useState(false);

  const navigateToHome = () => {
    navigation.navigate('Homes');
  };

  const navigateToPersonalData = () => {
    navigation.navigate('PersonalDataScreen');
  };

  const navigateToSettings = () => {
    navigation.navigate('SettingsScreen');
  };

  const navigateToHelpCenter = () => {
    navigation.navigate('HelpCenterScreen');
  };

  const navigateToExtraCard = () => {
    navigation.navigate('ExtraCardScreen');
  };

  const handleSignOut = () => {
    // Handle sign out logic here
    setSignOutModalVisible(false);
    // Navigate to login screen or reset auth state
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Profile Header */}
      <Text style={styles.headerTitle}>Profile Settings</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Info */}
        <View style={styles.profileInfoContainer}>
          <View style={styles.profileImageContainer}>
            <Image
              source={require('../../assets/image.png')}
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.cameraIconContainer}>
              <Ionicons name="camera" size={18} color="white" />
            </TouchableOpacity>
          </View>

          <Text style={styles.userName}>Albert Stevano Bajefski</Text>
          <Text style={styles.userEmail}>Albertstevano@gmail.com</Text>
        </View>

        {/* My Orders Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>My Orders</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.orderContainer}>
            <View style={styles.orderHeader}>
              <Text style={styles.orderLabel}>Order ID</Text>
              <Text style={styles.orderId}>888333777</Text>
              <View style={styles.statusContainer}>
                <Text style={styles.statusText}>In Delivery</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.orderDetails}>
              <Image
                source={require('../../assets/images/burger1.png')}
                style={styles.foodImage}
              />
              <View style={styles.orderInfo}>
                <Text style={styles.foodName}>Burger With Meat</Text>
                <Text style={styles.foodPrice}>$ 12,230</Text>
              </View>
              <Text style={styles.itemCount}>14 items</Text>
            </View>
          </View>
        </View>

        {/* Profile Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionLabel}>Profile</Text>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={navigateToPersonalData}
          >
            <View style={styles.menuIconContainer}>
              <Ionicons name="person-outline" size={22} color="#000" />
            </View>
            <Text style={styles.menuText}>Personal Data</Text>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={navigateToSettings}
          >
            <View style={styles.menuIconContainer}>
              <Ionicons name="settings-outline" size={22} color="#000" />
            </View>
            <Text style={styles.menuText}>Settings</Text>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={navigateToExtraCard}
          >
            <View style={styles.menuIconContainer}>
              <Ionicons name="card-outline" size={22} color="#000" />
            </View>
            <Text style={styles.menuText}>Extra Card</Text>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Support Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionLabel}>Support</Text>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={navigateToHelpCenter}
          >
            <View style={styles.menuIconContainer}>
              <Ionicons name="help-circle-outline" size={22} color="#000" />
            </View>
            <Text style={styles.menuText}>Help Center</Text>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Ionicons name="trash-outline" size={22} color="#000" />
            </View>
            <Text style={styles.menuText}>Request Account Deletion</Text>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Ionicons name="person-add-outline" size={22} color="#000" />
            </View>
            <Text style={styles.menuText}>Add another account</Text>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Sign Out Button */}
        <TouchableOpacity
          style={styles.signOutButton}
          onPress={() => setSignOutModalVisible(true)}
        >
          <Ionicons name="log-out-outline" size={20} color={colors.primary} />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>

        {/* Extra space at bottom */}
        <View style={styles.bottomSpace} />
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation />

      {/* Sign Out Modal */}
      <SignOutModal
        visible={signOutModalVisible}
        onCancel={() => setSignOutModalVisible(false)}
        onConfirm={handleSignOut}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
  profileInfoContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  cameraIconContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: colors.primary,
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 14,
    color: '#777',
  },
  sectionContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginHorizontal: 15,
    marginBottom: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  seeAllText: {
    color: colors.primary,
    fontWeight: '500',
  },
  orderContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
  },
  orderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  orderLabel: {
    fontSize: 14,
    color: '#777',
  },
  orderId: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 5,
  },
  statusContainer: {
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    marginLeft: 'auto',
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 10,
  },
  orderDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  foodImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  orderInfo: {
    marginLeft: 10,
    flex: 1,
  },
  foodName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  foodPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  itemCount: {
    fontSize: 14,
    color: '#666',
  },
  sectionLabel: {
    fontSize: 16,
    color: '#777',
    marginBottom: 15,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuIconContainer: {
    width: 40,
    alignItems: 'center',
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginHorizontal: 15,
    marginVertical: 20,
    padding: 15,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  signOutText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 10,
  },
  bottomSpace: {
    height: 90,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
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
    color: colors.primary,
  },
});

export default ProfileScreen;
