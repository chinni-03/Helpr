import { Image, StyleSheet, Text, View, TouchableOpacity, StatusBar, Platform, Alert } from "react-native";
import Profile from "../assets/me.jpg";
import Volunteer from "../assets/volunteer.png";
import React, { useState, useEffect } from "react";
import MapView, { Marker, Circle } from "react-native-maps";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import call from 'react-native-phone-call';

export default function HomeScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [region, setRegion] = useState(null);
  const [zones, setZones] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log(status);
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, distanceInterval: 1 },
        (loc) => {
          setLocation(loc);
          setRegion({
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          });
        }
      );
    })();

    // Simulate some zones (replace this with actual data)
    setZones([
      { id: 1, latitude: 12.9716, longitude: 77.5946, radius: 1000, type: "danger" }, // Danger zone
      { id: 2, latitude: 12.9750, longitude: 77.6000, radius: 800, type: "safe" },   // Safe zone
    ]);
  }, []);

  if (!location) {
    return (
      <View style={styles.container}>
        <Text>{errorMsg ? errorMsg : "Waiting for location..."}</Text>
      </View>
    );
  }

  const navigateToSettings = () => {
    setTimeout(() => {
      navigation.navigate("Settings");
    }, 0);
  };

  const phoneNumber = '9901562607';

  const makeEmergencyCall = async () => {
    try {
      Alert.alert(
        'Emergency Call',
        'Initiate emergency call immediately?',
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Call', 
            onPress: () => {
              const args = { number: phoneNumber, prompt: false };
              call(args).catch((err) => {
                console.error('Call failed', err);
                Alert.alert('Call Failed', 'Unable to make emergency call. Please dial manually.');
              });
            },
            style: 'destructive',
          }
        ]
      );
    } catch (error) {
      console.error('Emergency call setup failed:', error);
      Alert.alert('Error', 'Could not initiate emergency call.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <TouchableOpacity style={styles.profileContainer} onPress={navigateToSettings}>
          <Image source={Profile} style={styles.profile} />
          <View>
            <Text style={styles.name}>Harshini</Text>
            <Text style={styles.location}>Current Location</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.profileContainer}>
          <Image source={Volunteer} style={styles.volunteer} />
        </View>
      </View>
      <View style={styles.map}>
        <MapView
          style={styles.mapInside}
          region={region}
          onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
          showsUserLocation={true}
          followsUserLocation={true}
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="You are here"
          />
          
          {zones.map((zone) => (
            <Circle
              key={zone.id}
              center={{
                latitude: zone.latitude,
                longitude: zone.longitude,
              }}
              radius={zone.radius}
              strokeWidth={2}
              strokeColor={zone.type === "danger" ? "red" : "green"}
              fillColor={zone.type === "danger" ? "rgba(255, 0, 0, 0.3)" : "rgba(0, 255, 0, 0.3)"}
            />
          ))}
        </MapView>
      </View>
      <TouchableOpacity style={styles.sosMain} onPress={makeEmergencyCall}>
        <Text style={[styles.sosText, styles.white]}>SOS</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignSelf: "stretch",
    backgroundColor: "#000",
    padding: 25,
    paddingBottom: 10,
  },
  white: {
    color: "#fff",
  },
  nav: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
  profile: {
    width: 48,
    height: 48,
    borderRadius: 50,
  },
  name: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 14,
  },
  location: {
    color: "#fff",
    opacity: 0.7,
    fontSize: 12,
  },
  profileContainer: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    flexWrap: "wrap",
  },
  map: {
    width: "100%",
    height: "75%",
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  mapInside: {
    width: "100%",
    height: "100%",
  },
  sosMain: {
    backgroundColor: "#C70039",
    padding: 12,
    borderRadius: 28,
  },
  sosText: {
    alignSelf: "center",
    fontSize: 24,
    fontWeight: "500",
    letterSpacing: 2,
  },
  volunteer: {
    width: 48,
    height: 48,
  },
});
