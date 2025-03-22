import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

const CallScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = route.params || { user: { name: 'Steveno Clirover' } };
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.callerInfo}>
        <Text style={styles.callerName}>{user.name}</Text>
        <Text style={styles.callStatus}>Call in progress...</Text>
        <Text style={styles.callDuration}>{formatDuration(callDuration)}</Text>
      </View>

      <Image
        source={require('../../assets/images/avatar1.png')}
        style={styles.callerImage}
      />

      <View style={styles.callControls}>
        <TouchableOpacity
          style={[styles.controlButton, isMuted && styles.activeButton]}
          onPress={() => setIsMuted(!isMuted)}
        >
          <Ionicons name={isMuted ? 'mic-off' : 'mic'} size={28} color="#FFF" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.endCallButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="call" size={32} color="#FFF" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.controlButton, isSpeaker && styles.activeButton]}
          onPress={() => setIsSpeaker(!isSpeaker)}
        >
          <Ionicons name="volume-high" size={28} color="#FFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202020',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 40,
  },
  callerInfo: {
    alignItems: 'center',
  },
  callerName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 8,
  },
  callStatus: {
    fontSize: 16,
    color: '#CCC',
    marginBottom: 8,
  },
  callDuration: {
    fontSize: 14,
    color: '#AAA',
  },
  callerImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginVertical: 40,
  },
  callControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#444',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  activeButton: {
    backgroundColor: '#FF8A00',
  },
  endCallButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FF4B4B',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '135deg' }],
  },
});

export default CallScreen;
