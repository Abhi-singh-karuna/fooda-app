import {
  StyleSheet,
  View,
  Text,
  Button,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import image from '../../assets/image.png';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

export default function FirstScreen() {
  const navigation = useNavigation(); // Initialize navigation

  return (
    <ImageBackground source={image} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
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

          {/* Static slider indicators instead of FlatList */}
          <View style={styles.sliderContainer}>
            <View style={styles.sliderContainerInner}>
              <View style={styles.indicatorContainer}>
                <View style={[styles.indicator, styles.grayIndicator]} />
                <View style={[styles.indicator, styles.whiteIndicator]} />
                <View style={[styles.indicator, styles.grayIndicator]} />
              </View>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('HomeScreens')}
            >
              <Text style={styles.buttonText}>Skip</Text>
            </TouchableOpacity>

            <View style={styles.nextButtonContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate('SecondScreen')}
              >
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
              <Image
                source={require('../../assets/next-icon.png')}
                style={styles.nextButtonImage}
              />
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

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
    marginBottom: 40,
    marginHorizontal: 10,
    padding: 20,
    width: 360,
    height: 400,
    backgroundColor: '#FE8C00',
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
    width: '90%',
    marginTop: 'auto',
  },
  buttonText: {
    color: '#ffffff',
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
    marginLeft: 5,
  },
  sliderContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  sliderContainerInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    width: 30,
    height: 6,
    borderRadius: 5,
    marginHorizontal: 2,
  },
  whiteIndicator: {
    backgroundColor: '#FFFFFF',
  },
  grayIndicator: {
    backgroundColor: '#CCCCCC',
  },
});
