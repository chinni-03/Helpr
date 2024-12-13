import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Animated } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { addZoneDataToFirestore } from '../Backend/ZoneService';
import { useFocusEffect } from '@react-navigation/native'; // To handle screen focus

export default function ReportZone() {
  const route = useRoute();
  const navigation = useNavigation();
  const { location } = route.params; // Getting location from params

  const [description, setDescription] = useState('');
  const [zoneType, setZoneType] = useState('danger'); // Default is 'danger'
  const [isLoading, setIsLoading] = useState(false);
  const opacity = new Animated.Value(0);

  // Fade-in animation when component loads
  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  // Reset zone type when the screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      setZoneType('danger'); // Reset to 'danger' whenever the screen is focused
    }, [])
  );

  // Handle report submission
  const handleReport = async () => {
    if (!description) {
      Alert.alert('Error', 'Please provide a description.');
      return;
    }

    setIsLoading(true);
    try {
      const zone = {
        latitude: location.latitude,
        longitude: location.longitude,
        type: zoneType,
        description: description,
      };

      // Add zone to Firestore
      await addZoneDataToFirestore(zone);
      Alert.alert('Success', 'Zone reported successfully!');
      navigation.goBack(); // Go back to the previous screen after submitting
    } catch (error) {
      Alert.alert('Error', 'Could not report zone. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <Text style={styles.title}>Report a Zone</Text>

      {/* Description Input */}
      <TextInput
        style={styles.input}
        placeholder="Describe the zone"
        value={description}
        onChangeText={setDescription}
        multiline
        placeholderTextColor="#bbb"
      />

      <Text style={styles.label}>Select Zone Type</Text>

      {/* Zone Type Buttons */}
      <View style={styles.typeButtons}>
        <TouchableOpacity
          style={[styles.button, zoneType === 'danger' && styles.dangerButton]}
          onPress={() => setZoneType('danger')}
        >
          <Text style={styles.buttonText}>Danger Zone</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, zoneType === 'safe' && styles.safeButton]}
          onPress={() => setZoneType('safe')}
        >
          <Text style={styles.buttonText}>Safe Zone</Text>
        </TouchableOpacity>
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        style={[styles.submitButton, isLoading && styles.disabledButton]}
        onPress={handleReport}
        disabled={isLoading}
      >
        <Text style={styles.submitButtonText}>{isLoading ? 'Submitting...' : 'Submit'}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Black background for dark theme
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  input: {
    width: '100%',
    height: 120,
    borderWidth: 1,
    borderColor: '#444', // Dark border
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    backgroundColor: '#222', // Dark background
    color: '#fff',
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  label: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
    color: '#fff',
  },
  typeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  button: {
    width: '48%',
    padding: 15,
    backgroundColor: '#444',
    borderRadius: 8,
    alignItems: 'center',
  },
  dangerButton: {
    backgroundColor: '#ff4d4d', // Red for Danger Zone
  },
  safeButton: {
    backgroundColor: '#28a745', // Green for Safe Zone
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
  },
  submitButton: {
    backgroundColor: '#28a745', // Green color for submit button
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 28,
    alignItems: 'center',
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: '#666', // Disabled button style
  },
  submitButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
