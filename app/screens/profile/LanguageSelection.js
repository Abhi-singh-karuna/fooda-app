// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   StatusBar,
//   FlatList,
//   Image,
//   Modal,
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';
// import { colors } from '../../styles/colors';

// const languages = [
//   {
//     id: 'id',
//     name: 'Indonesia',
//     flag: '🇮🇩',
//   },
//   {
//     id: 'en',
//     name: 'English (US)',
//     flag: '🇺🇸',
//     selected: true,
//   },
//   {
//     id: 'th',
//     name: 'Thailand',
//     flag: '🇹🇭',
//   },
//   {
//     id: 'zh',
//     name: 'Chinese',
//     flag: '🇨🇳',
//   },
// ];

// const LanguageSelection = ({ onClose }) => {
//   const navigation = useNavigation();
//   const [selectedLanguage, setSelectedLanguage] = useState('en');

//   const selectLanguage = (id) => {
//     setSelectedLanguage(id);
//   };

//   const handleConfirm = () => {
//     onClose();
//   };

//   const renderLanguageItem = ({ item }) => {
//     const isSelected = selectedLanguage === item.id;

//     return (
//       <TouchableOpacity
//         style={[styles.languageItem, isSelected && styles.selectedLanguageItem]}
//         onPress={() => selectLanguage(item.id)}
//       >
//         <View style={styles.flagContainer}>
//           <Text style={styles.flagEmoji}>{item.flag}</Text>
//         </View>
//         <Text style={styles.languageName}>{item.name}</Text>
//         {isSelected && (
//           <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
//         )}
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="dark-content" />

//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity
//           style={styles.backButton}
//           onPress={() => navigation.goBack()}
//         >
//           <Ionicons name="chevron-back" size={24} color="#000" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Settings</Text>
//         <View style={styles.placeholder} />
//       </View>

//       <View style={styles.contentContainer}>
//         <Text style={styles.selectionTitle}>Select Language</Text>

//         <FlatList
//           data={languages}
//           keyExtractor={(item) => item.id}
//           renderItem={renderLanguageItem}
//           style={styles.languageList}
//           contentContainerStyle={styles.languageListContent}
//         />

//         <TouchableOpacity style={styles.selectButton} onPress={onClose}>
//           <Text style={styles.selectButtonText}>Select</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F7F8FA',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 15,
//     paddingTop: 50,
//     paddingBottom: 15,
//     backgroundColor: '#fff',
//   },
//   backButton: {
//     width: 40,
//     height: 40,
//     justifyContent: 'center',
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//   },
//   placeholder: {
//     width: 40,
//   },
//   contentContainer: {
//     flex: 1,
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingTop: 20,
//   },
//   selectionTitle: {
//     fontSize: 20,
//     fontWeight: '600',
//     marginVertical: 20,
//   },
//   languageList: {
//     width: '100%',
//   },
//   languageListContent: {
//     marginTop: 10,
//   },
//   languageItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 15,
//     paddingHorizontal: 20,
//     borderWidth: 1,
//     borderColor: '#EEEEEE',
//     borderRadius: 12,
//     marginBottom: 15,
//     backgroundColor: '#FFFFFF',
//   },
//   selectedLanguageItem: {
//     borderColor: colors.primary,
//   },
//   flagContainer: {
//     marginRight: 15,
//   },
//   flagEmoji: {
//     fontSize: 24,
//   },
//   languageName: {
//     fontSize: 16,
//     flex: 1,
//   },
//   selectButton: {
//     backgroundColor: colors.primary,
//     width: '100%',
//     paddingVertical: 15,
//     alignItems: 'center',
//     borderRadius: 30,
//     marginTop: 'auto',
//     marginBottom: 30,
//   },
//   selectButtonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     justifyContent: 'flex-end',
//   },
//   modalContainer: {
//     backgroundColor: '#FFFFFF',
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     padding: 20,
//     height: '50%', // Adjust height as needed
//   },
// });

// export default LanguageSelection;
