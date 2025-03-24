// app/components/CountryCodePicker.js
import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';

const countryCodes = {
  '+91': 'India',
  '+1': 'USA',
  '+62': 'Indonesia',
  '+971': 'United Arab Emirates',
  '+964': 'Iraq',
  '+966': 'Saudi Arabia',
  '+965': 'Kuwait',
  '+964': 'Iraq',
  '+966': 'Saudi Arabia',
  '+965': 'Kuwait',
  '+964': 'Iraq',
  '+966': 'Saudi Arabia',
  '+965': 'Kuwait',
  '+964': 'Iraq',
  '+966': 'Saudi Arabia',
  '+965': 'Kuwait',
};

const CountryCodePicker = ({ visible, onClose, onSelect }) => {
  console.log('Modal visibility:', visible); // Debugging line
  return (
    <Modal transparent={true} visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Select Country Code</Text>
          <FlatList
            data={Object.keys(countryCodes)}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.item}
                onPress={() => {
                  onSelect(item);
                  onClose();
                }}
              >
                <Text style={styles.itemText}>
                  {countryCodes[item]} ({item})
                </Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000, // Ensure the modal is on top
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  itemText: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 20,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FE8C00',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CountryCodePicker;
