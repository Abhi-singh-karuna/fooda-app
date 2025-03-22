import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Image,
  StatusBar,
  Platform,
} from 'react-native';
import NotificationCard from '../../components/NotificationCard';
import { Swipeable } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';

const notificationDetails = {
  discount: {
    image: require('../../assets/notification/discount.png'),
    color: '#FFCCCB',
  },
  order: {
    image: require('../../assets/notification/order.png'),
    color: '#D1E7DD',
  },
  cancel: {
    image: require('../../assets/notification/cancel.png'),
    color: '#FFCCCB',
  },
  success: {
    image: require('../../assets/notification/order.png'),
    color: '#D1E7DD',
  },
  creditCard: {
    image: require('../../assets/notification/discount.png'),
    color: '#FFCCCB',
  },
};

const notificationsData = [
  {
    id: '1',
    title: '30% Special Discount!',
    description: 'Special promotion only valid todayiudsyiudysiudsdsdsd',
    date: new Date('2025-03-18T00:00:00Z'),
    type: 'discount',
    isDeleted: false,
    isRead: false,
  },
  {
    id: '2',
    title: 'Your Order Has Been Taken by the Driver',
    description: 'Recently!',
    date: new Date('2025-03-18T00:00:00Z'),
    type: 'order',
    isDeleted: false,
    isRead: true,
  },
  {
    id: '3',
    title: 'Your Order Has Been Canceled',
    description: '',
    date: new Date('2023-06-19T00:00:00Z'),
    type: 'cancel',
    isDeleted: false,
    isRead: false,
  },
  {
    id: '4',
    title: '35% Special Discount!',
    description: 'Special promotion only valid today',
    date: new Date('2023-06-20T00:00:00Z'),
    type: 'discount',
    isDeleted: false,
    isRead: false,
  },
  {
    id: '5',
    title: 'Account Setup Successful!!',
    description: 'Special promotion only valid today',
    date: new Date('2023-06-21T00:00:00Z'),
    type: 'success',
    isDeleted: false,
    isRead: false,
  },
  {
    id: '6',
    title: 'Special Offer! 60% Off',
    description: 'Special offer for new account, valid until 20 Nov 2022',
    date: new Date('2025-02-11T00:00:00Z'),
    type: 'discount',
    isDeleted: false,
    isRead: false,
  },
  {
    id: '7',
    title: 'Credit Card Connected',
    description: 'Your credit card has been successfully connected.',
    date: new Date('2023-06-22T00:00:00Z'),
    type: 'creditCard',
    isDeleted: false,
    isRead: false,
  },
  {
    id: '8',
    title: 'Special Offer! 60% Off',
    description: 'Special offer for new account, valid until 20 Nov 2022',
    date: new Date('2022-11-20T00:00:00Z'),
    type: 'discount',
    isDeleted: false,
    isRead: false,
  },
  {
    id: '9',
    title: 'Special Offer! 60% Off',
    description: 'Special offer for new account, valid until 20 Nov 2022',
    date: new Date('2022-11-20T00:00:00Z'),
    type: 'discount',
    isDeleted: false,
    isRead: false,
  },
  {
    id: '10',
    title: 'Special Offer! 60% Off',
    description: 'Special offer for new account, valid until 20 Nov 2022',
    date: new Date('2022-11-20T00:00:00Z'),
    type: 'discount',
    isDeleted: false,
    isRead: false,
  },
];
// // Log the dates to check their validity
// notificationsData.forEach((notification) => {
//   console.log(
//     `Notification ID: ${notification.id}, Date: ${
//       notification.date
//     }, Type: ${typeof notification.date}`,
//   );
//   if (
//     !(notification.date instanceof Date) ||
//     isNaN(notification.date.getTime())
//   ) {
//     console.error(
//       `Invalid date for notification ID ${notification.id}:`,
//       notification.date,
//     );
//   }
// });

// Function to group notifications by date
const groupNotificationsByDate = (notifications) => {
  const today = new Date();
  const lastFiveYears = Array.from(
    { length: 5 },
    (_, i) => today.getFullYear() - i,
  );

  const groupedNotifications = {
    Today: [],
    Yesterday: [],
    'Last Week': [],
    'Last Month': [],
  };

  lastFiveYears.forEach((year) => {
    groupedNotifications[year] = [];
  });

  notifications.forEach((notification) => {
    const notificationDate = new Date(notification.date);
    if (
      notificationDate.getDate() === today.getDate() &&
      notificationDate.getMonth() === today.getMonth() &&
      notificationDate.getFullYear() === today.getFullYear()
    ) {
      groupedNotifications.Today.push(notification);
    } else if (
      notificationDate.getDate() === today.getDate() - 1 &&
      notificationDate.getMonth() === today.getMonth() &&
      notificationDate.getFullYear() === today.getFullYear()
    ) {
      groupedNotifications.Yesterday.push(notification);
    } else if (
      notificationDate >= new Date(today.setDate(today.getDate() - 7)) &&
      notificationDate < today
    ) {
      groupedNotifications['Last Week'].push(notification);
    } else if (
      notificationDate >= new Date(today.setMonth(today.getMonth() - 1)) &&
      notificationDate < today
    ) {
      groupedNotifications['Last Month'].push(notification);
    } else {
      const year = notificationDate.getFullYear();
      if (lastFiveYears.includes(year)) {
        groupedNotifications[year].push(notification);
      }
    }
  });

  return groupedNotifications;
};

const NotificationScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState(notificationsData);
  const swipeableRefs = useRef(new Map());

  const groupedNotifications = groupNotificationsByDate(notifications);

  const deleteNotification = (id) => {
    const updatedNotifications = notifications.map((notification) =>
      notification.id === id
        ? { ...notification, isDeleted: true }
        : notification,
    );
    setNotifications(updatedNotifications);
  };

  const renderRightActions = (progress, dragX, item) => {
    const trans = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [0, 100],
      extrapolate: 'clamp',
    });

    const opacity = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });

    const scale = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0.8, 1],
    });

    return (
      <Animated.View
        style={[styles.deleteContainer, { transform: [{ translateX: trans }] }]}
      >
        <Animated.View
          style={[
            styles.deleteIconContainer,
            { opacity, transform: [{ scale }] },
          ]}
        >
          <TouchableOpacity
            onPress={() => deleteNotification(item.id)}
            style={styles.deleteButton}
          >
            <MaterialIcons name="delete" size={30} color="white" />
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    );
  };

  const renderNotification = ({ item }) => {
    if (!item || item.isDeleted) return null;

    return (
      <Swipeable
        ref={(ref) => {
          if (ref && !swipeableRefs.current.get(item.id)) {
            swipeableRefs.current.set(item.id, ref);
          }
        }}
        friction={2}
        leftThreshold={80}
        rightThreshold={80}
        renderRightActions={(progress, dragX) =>
          renderRightActions(progress, dragX, item)
        }
        onSwipeableRightOpen={() => {
          swipeableRefs.current.forEach((ref, key) => {
            if (key !== item.id && ref) ref.close();
          });

          setTimeout(() => deleteNotification(item.id), 200);
        }}
      >
        <NotificationCard
          key={item.id}
          title={item.title}
          description={item.description}
          date={item.date}
          image={notificationDetails[item.type]?.image}
          color={notificationDetails[item.type]?.color || '#FFCCCB'}
        />
      </Swipeable>
    );
  };

  // Flatten and sort notifications by date in descending order
  const sortedNotifications = Object.keys(groupedNotifications)
    .flatMap((key) => groupedNotifications[key])
    .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Image
            source={require('../../assets/back.png')}
            style={styles.backImage}
          />
        </TouchableOpacity>
        <Text style={styles.header}>Notification</Text>
      </View>

      <FlatList
        data={sortedNotifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>No notifications</Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: Platform.OS === 'ios' ? '13%' : 0,
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  backImage: {
    width: 40,
    height: 40,
  },
  dateHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#CED0CE',
    marginBottom: 10, // Space between the line and notifications
  },
  deleteContainer: {
    width: 100,
    height: '100%',
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    padding: 20,
    color: '#666',
  },
});

export default NotificationScreen;
