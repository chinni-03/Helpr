import { Image, StyleSheet, Text, View, TouchableOpacity, StatusBar } from "react-native";
import Profile from "../assets/me.jpg";
import Volunteer from "../assets/volunteer.png";
import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [region, setRegion] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
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
  }, []);

  if (!location) {
    return (
      <View style={styles.container}>
        <Text>{errorMsg ? errorMsg : "Waiting for location..."}</Text>
      </View>
    );
  }

  const navigateToSettings = () => {
    navigation.navigate("Settings");
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
        </MapView>
      </View>
      <View style={styles.sosMain}>
        <Text style={[styles.sosText, styles.white]}>SOS</Text>
      </View>
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
