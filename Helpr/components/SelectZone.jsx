import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';

export default function SelectZone() {
  const navigation = useNavigation();
  const [region, setRegion] = useState(null);

  const handleMapPress = (e) => {
    setRegion(e.nativeEvent.coordinate);
  };

  const handleConfirmLocation = () => {
    if (!region) {
      Alert.alert('Error', 'Please select a location on the map.');
      return;
    }
    // Navigate to the ReportZone screen with the selected location
    navigation.navigate('ReportZone', { location: region });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Location for Reporting</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={handleMapPress}
      >
        {region && <Marker coordinate={region} />}
      </MapView>
      <Button title="Confirm Location" onPress={handleConfirmLocation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  map: {
    width: '100%',
    height: 400,
    marginBottom: 20,
  },
});
