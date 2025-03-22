import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  StatusBar,
  Modal,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../styles/colors';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const [isPushEnabled, setIsPushEnabled] = useState(false);
  const [isLocationEnabled, setIsLocationEnabled] = useState(true);
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const languages = [
    { id: 'id', name: 'Indonesia', flag: '🇮🇩' },
    { id: 'en', name: 'English (US)', flag: '🇺🇸' },
    { id: 'th', name: 'Thailand', flag: '🇹🇭' },
    { id: 'zh', name: 'Chinese', flag: '🇨🇳' },
  ];

  const selectLanguage = useCallback((id) => {
    setSelectedLanguage(id);
  }, []);

  const log = (message) => {
    console.log(`[SettingsScreen] ${message}`);
  };

  // Log the languages array when the component mounts
  React.useEffect(() => {
    log(`Available languages: ${JSON.stringify(languages)}`);
  }, []);

  const handleConfirm = useCallback(() => {
    log(`Language selected: ${selectedLanguage}`);
    setLanguageModalVisible(false);
  }, [selectedLanguage]);

  // Log when the FlatList is rendered
  const renderLanguageItem = useCallback(
    ({ item }) => {
      log(`Rendering language item: ${JSON.stringify(item)}`);
      if (!item) {
        log('Item is undefined or null');
        return null;
      }

      const isSelected = selectedLanguage === item.id;

      return (
        <TouchableOpacity
          style={[
            styles.languageItem,
            isSelected && styles.selectedLanguageItem,
          ]}
          onPress={() => selectLanguage(item.id)}
        >
          <View style={styles.flagContainer}>
            <Text style={styles.flagEmoji}>{item.flag}</Text>
          </View>
          <Text style={styles.languageName}>{item.name}</Text>
          {isSelected && (
            <Ionicons
              name="checkmark-circle"
              size={24}
              color={colors.primary}
            />
          )}
        </TouchableOpacity>
      );
    },
    [selectedLanguage, selectLanguage],
  );

  // Log the keyExtractor output
  const keyExtractor = useCallback((item) => {
    const key = item?.id?.toString() || Math.random().toString();
    log(`Key extracted: ${key}`);
    return key;
  }, []);

  const renderEmptyList = useCallback(
    () => (
      <View style={styles.emptyList}>
        <Text>No languages available</Text>
      </View>
    ),
    [],
  );

  const navigateToAboutScreen = () => {
    // Future implementation
  };

  const navigateToPrivacyPolicy = () => {
    // Future implementation
  };

  const navigateToTerms = () => {
    // Future implementation
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Profile Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>PROFILE</Text>

        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Push Notification</Text>
          <Switch
            trackColor={{ false: '#E8E8E8', true: colors.primary }}
            thumbColor={'#FFFFFF'}
            ios_backgroundColor="#E8E8E8"
            onValueChange={() => setIsPushEnabled((prev) => !prev)}
            value={isPushEnabled}
          />
        </View>

        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Location</Text>
          <Switch
            trackColor={{ false: '#E8E8E8', true: colors.primary }}
            thumbColor={'#FFFFFF'}
            ios_backgroundColor="#E8E8E8"
            onValueChange={() => setIsLocationEnabled((prev) => !prev)}
            value={isLocationEnabled}
          />
        </View>

        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => setLanguageModalVisible(true)}
        >
          <Text style={styles.settingLabel}>Language</Text>
          <View style={styles.valueContainer}>
            <Text style={styles.settingValue}>
              {languages.find((lang) => lang.id === selectedLanguage)?.name ||
                'English (US)'}
            </Text>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Other Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>OTHER</Text>

        <TouchableOpacity
          style={styles.settingItem}
          onPress={navigateToAboutScreen}
        >
          <Text style={styles.settingLabel}>About Ticketis</Text>
          <Ionicons name="chevron-forward" size={20} color="#666" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingItem}
          onPress={navigateToPrivacyPolicy}
        >
          <Text style={styles.settingLabel}>Privacy Policy</Text>
          <Ionicons name="chevron-forward" size={20} color="#666" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem} onPress={navigateToTerms}>
          <Text style={styles.settingLabel}>Terms and Conditions</Text>
          <Ionicons name="chevron-forward" size={20} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Language Selection Modal */}
      <Modal
        visible={languageModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setLanguageModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.selectionTitle}>Select Language</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setLanguageModalVisible(false)}
              >
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            <FlatList
              data={languages}
              renderItem={renderLanguageItem}
              keyExtractor={keyExtractor}
              ListEmptyComponent={renderEmptyList}
              style={styles.languageList}
              contentContainerStyle={styles.languageListContent}
              initialNumToRender={4}
              maxToRenderPerBatch={4}
              windowSize={5}
            />

            <TouchableOpacity
              style={styles.selectButton}
              onPress={handleConfirm}
            >
              <Text style={styles.selectButtonText}>Select</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: '#fff',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  placeholder: {
    width: 40,
  },
  section: {
    backgroundColor: 'white',
    marginTop: 20,
    paddingVertical: 5,
  },
  sectionTitle: {
    fontSize: 14,
    color: '#888',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  settingLabel: {
    fontSize: 16,
    color: '#333',
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingValue: {
    fontSize: 16,
    color: '#777',
    marginRight: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: '50%',
  },
  selectionTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 12,
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
  },
  selectedLanguageItem: {
    borderColor: colors.primary,
  },
  flagContainer: {
    marginRight: 15,
  },
  flagEmoji: {
    fontSize: 24,
  },
  languageName: {
    fontSize: 16,
    flex: 1,
  },
  selectButton: {
    backgroundColor: colors.primary,
    width: '100%',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 30,
    marginTop: 'auto',
    marginBottom: 30,
  },
  selectButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  languageList: {
    padding: 20,
  },
  languageListContent: {
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  closeButton: {
    padding: 5,
  },
  emptyList: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});

export default SettingsScreen;
