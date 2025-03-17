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
import image from '../../assets/image.png'; // Adjust the path as necessary
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from '../../navigation/AppNavigator';

const images = [
  require('../../assets/Rectangle-white.png'),
  require('../../assets/Rectangle-gray.png'),
  require('../../assets/Rectangle-gray.png'),
];

export default function HomeScreen() {
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
          <View style={styles.buttonContainer}>
            <Button
              title="Skip"
              onPress={() => navigation.navigate('Homes')}
              color="#ffffff"
            />
            <TouchableOpacity
              style={styles.nextButtonContainer}
              onPress={() => navigation.navigate('FirstScreen')} // Navigate to firstScreen
            >
              <Button title="Next" color="#ffffff" />
              <Image
                source={require('../../assets/next-icon.png')}
                style={styles.nextButtonImage}
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
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    // flex:1,
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
