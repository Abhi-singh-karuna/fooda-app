import {
  StyleSheet,
  View,
  Text,
  Button,
  ImageBackground,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React from 'react';
import image from '../../assets/image.png'; // Adjust the path as necessary
import { useNavigation } from '@react-navigation/native'; // Import useNavigation


const images = [
  require('../../assets/Rectangle-white.png'),
  require('../../assets/Rectangle-gray.png'),
  require('../../assets/Rectangle-gray.png'),
];

const HomeScreen = () => {
  const navigation = useNavigation(); // Initialize navigation

  // Define styles based on the platform
  const platformStyles = {
    backgroundColor: Platform.OS === 'ios' ? '#FE8C00' : '#FE8C00', // Example colors
    padding: Platform.OS === 'ios' ? 20 : 10, // Example padding
  };

  return (
    <ImageBackground source={image} style={styles.background}>
      <View style={styles.container}>
        <View style={[styles.textContainer, platformStyles]}>
          <View>
            <Text style={styles.title}>
              We serve{'\n'}incomparable{'\n'}delicacies
            </Text>
          </View>
          <View>
            <Text style={styles.subtitle}>
              All the best restaurants with their top menu waiting for you, they
              can't wait for your order!!
            </Text>
          </View>
          <View style={styles.sliderContainer}>
            <View style={styles.sliderContainerInner}>
              <View style={styles.sliderItems}>
                <View
                  style={[styles.sliderIndicator, styles.activeIndicator]}
                />
                <View style={styles.sliderIndicator} />
                <View style={styles.sliderIndicator} />
              </View>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('HomeScreens')}
            >
              <Text style={styles.buttonText}>Skip</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('FirstScreen')}
            >
              <View style={styles.nextButtonContainer}>
                <Text style={styles.buttonText}>Next </Text>
                <Image
                  source={require('../../assets/next-icon.png')}
                  style={styles.nextButtonImage}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    marginTop: '100%',
    marginBottom: '5%',
    marginHorizontal: 10,
    width: 360,
    height: 400,
    borderRadius: 55,
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    paddingBottom: 30,
  },
  subtitle: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '140%',
    marginTop: 'auto',
    // marginHorizontal: 10,
  },
  button: {
    // backgroundColor: '#FE8C00', // Set button background color
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    // marginHorizontal: 30, // Increase spacing between buttons
  },
  buttonText: {
    color: '#ffffff', // Set text color
    fontSize: 16,
  },
  nextButtonContainer: {
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  nextButtonImage: {
    width: 15,
    height: 10,
    marginLeft: 1,
  },
  nextButton: {
    paddingRight: 20,
  },
  sliderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderContainerInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  sliderItems: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderIndicator: {
    width: 30,
    height: 6,
    borderRadius: 5,
    backgroundColor: '#cccccc',
    marginHorizontal: 2,
  },
  activeIndicator: {
    backgroundColor: '#ffffff',
  },
});
