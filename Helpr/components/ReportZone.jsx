import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { addZoneDataToFirestore } from '../Backend/ZoneService';
import { useFocusEffect } from '@react-navigation/native';

export default function ReportZone() {
  const route = useRoute();
  const navigation = useNavigation();
  const { location } = route.params;
  
  const [description, setDescription] = useState('');
  const [type, setType] = useState('danger'); // Default to 'danger' zone
  const [isLoading, setIsLoading] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setDescription('');
      setType('danger'); // Reset when screen comes into focus
    }, [])
  );

  const handleReport = async () => {
    if (!description.trim()) {
      Alert.alert('Error', 'Please provide a description.');
      return;
    }

    setIsLoading(true);
    try {
      const zone = {
        latitude: location.latitude,
        longitude: location.longitude,
        type: type,
        description: description.trim(),
      };
      await addZoneDataToFirestore(zone);
      Alert.alert('Success', 'Zone reported successfully!');
      navigation.goBack(); // Go back to the previous screen
    } catch (error) {
      console.error("Error reporting zone:", error);
      Alert.alert('Error', 'Could not report zone. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Report a Zone</Text>

      <TextInput
        style={styles.input}
        placeholder="Describe the zone"
        value={description}
        onChangeText={setDescription} // Ensure state is updated
        multiline
        placeholderTextColor="#bbb"
      />

      <Text style={styles.label}>Select Zone Type</Text>
      <View style={styles.typeButtons}>
        <TouchableOpacity
          style={[styles.button, type === 'danger' && styles.dangerButton]}
          onPress={() => setType('danger')}
        >
          <Text style={styles.buttonText}>Danger Zone</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, type === 'safe' && styles.safeButton]}
          onPress={() => setType('safe')}
        >
          <Text style={styles.buttonText}>Safe Zone</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.submitButton, isLoading && styles.disabledButton]}
        onPress={handleReport}
        disabled={isLoading}
      >
        <Text style={styles.submitButtonText}>{isLoading ? 'Submitting...' : 'Submit'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000', // Black background for dark theme
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff', // White text color for dark theme
  },
  input: {
    width: '100%',
    height: 120,
    borderWidth: 1,
    borderColor: '#444', // Dark border for input field
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    backgroundColor: '#222', // Dark background for input field
    color: '#fff', // White text color for input field
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  label: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
    color: '#fff', // White text for label
  },
  typeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  button: {
    width: '48%',
    padding: 12,
    backgroundColor: '#444', // Dark button background
    borderRadius: 8,
    alignItems: 'center',
  },
  dangerButton: {
    backgroundColor: '#ff4d4d', // Red button for Danger Zone
  },
  safeButton: {
    backgroundColor: '#28a745', // Green button for Safe Zone
  },
  buttonText: {
    fontSize: 16,
    color: '#fff', // White text color for buttons
  },
  submitButton: {
    backgroundColor: '#28a745', // Green submit button
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 28,
    alignItems: 'center',
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: '#666', // Disabled button color
  },
  submitButtonText: {
    fontSize: 18,
    color: '#fff', // White text color for submit button
    fontWeight: 'bold',
  },
});
