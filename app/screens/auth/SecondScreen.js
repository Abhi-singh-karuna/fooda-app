import {
  StyleSheet,
  View,
  Text,
  Button,
  ImageBackground,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import image from '../../assets/bg-Second-Screen.jpg'; // Adjust the path as necessary
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

// Assuming you have an array of image sources
const images = [
  require('../../assets/Rectangle-gray.png'),
  require('../../assets/Rectangle-gray.png'),
  require('../../assets/Rectangle-white.png'),
];

export default function WelcomeSecondScreen() {
  const navigation = useNavigation(); // Initialize navigation

  return (
    <ImageBackground source={image} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <View>
            <Text style={styles.title}>
              We serve{'\n'}incomparable{'\n'}delicacies-
            </Text>
          </View>
          <View>
            <Text style={styles.subtitle}>
              All the best restaurants with their top menu waiting for you, they
              can't wait for your order!!
            </Text>
          </View>
          <View style={styles.sliderContainer}>
            <View style={styles.sliderContainerInner}></View>
            <FlatList
              data={images}
              horizontal
              contentContainerStyle={{ justifyContent: 'center' }}
              renderItem={({ item }) => (
                <View style={styles.sliderItem}>
                  <Image source={item} style={styles.sliderImage} />
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
              alwaysBounceHorizontal={false}
            />
          </View>
          <View style={styles.nextButtonContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('SignupScreen')} // Navigate to firstScreen
            >
              <Image
                source={require('../../assets/Progress-button.png')}
                style={styles.nextButtonImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
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
  nextButtonContainer: {
    flex: 3,
  },
  nextButtonImage: {
    width: 150,
    height: 150,
    marginLeft: 1,
  },
  nextButton: {
    paddingRight: 20,
  },
  sliderContainer: {
    flex: 1,
  },
  sliderContainerInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  sliderItem: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 1,
    alignItems: 'center',
  },
  sliderImage: {
    width: 30,
    height: 6,
    borderRadius: 5,
    marginHorizontal: 2,
  },
});
