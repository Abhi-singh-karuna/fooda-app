import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import BottomNavigation from '../../components/BottomNavigation';

const ChatListScreen = () => {
  const navigation = useNavigation();

  const chatData = [
    {
      id: '1',
      name: 'Steveno Clirover',
      lastMessage: 'Hello there, just arrived',
      time: '08:47',
      avatar: require('../../assets/images/avatar1.png'),
      unread: 2,
    },
    {
      id: '2',
      name: 'Gosport Erlistair',
      lastMessage: 'Food ready and served',
      time: '07:34',
      avatar: require('../../assets/images/avatar1.png'),
      unread: 0,
    },
    {
      id: '3',
      name: 'Steveno Clirover',
      lastMessage: 'Hello there, just arrived',
      time: '07:21',
      avatar: require('../../assets/images/avatar1.png'),
      unread: 0,
    },
    {
      id: '4',
      name: 'Billa Justin',
      lastMessage: 'Food ready and served',
      time: '07:04',
      avatar: require('../../assets/images/avatar1.png'),
      unread: 1,
    },
    {
      id: '5',
      name: 'Gosport Erlistair',
      lastMessage: 'Food ready and served',
      time: '06:47',
      avatar: require('../../assets/images/avatar1.png'),
      unread: 0,
    },
  ];

  const renderChatItem = ({ item }) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() => navigation.navigate('ChatScreen', { user: item })}
    >
      <View style={styles.avatarContainer}>
        <Image source={item.avatar} style={styles.avatar} />
        {item.unread > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadText}>{item.unread}</Text>
          </View>
        )}
      </View>

      <View style={styles.messagePreview}>
        <View style={styles.messageHeader}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <Text style={styles.lastMessage} numberOfLines={1}>
          {item.lastMessage}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chat List</Text>
      </View>

      <View style={styles.messageHeader}>
        <Text style={styles.messageHeaderTitle}>AI Message</Text>
      </View>

      <FlatList
        data={chatData}
        renderItem={renderChatItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />

      <BottomNavigation />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  messageHeader: {
    padding: 12,
    backgroundColor: '#F8F8F8',
  },
  messageHeaderTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
  },
  listContent: {
    paddingBottom: 80,
  },
  chatItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  unreadBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#FF8A00',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  messagePreview: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  time: {
    fontSize: 12,
    color: '#888',
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
  },
});

export default ChatListScreen;
