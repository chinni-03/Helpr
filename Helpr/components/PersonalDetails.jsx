import React from "react";
import Profile from '../assets/me.jpg';
import { StyleSheet, View, Text, Image, TouchableOpacity, StatusBar } from "react-native";

export default function PersonalDetails() {
  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <Image
          source={Profile}
          style={styles.profileImage}
        />
      </View>
      <View style={styles.alignCenter}>
        <Text style={styles.name}>Harshini</Text>
        <Text style={styles.email}>username</Text>
      </View>
      <View style={styles.placeTop}>
        <Text style={styles.textStyle}>Name: <Text style={styles.lighterText}>Harshini</Text></Text>
        <Text style={styles.textStyle}>Email Address: <Text style={styles.lighterText}>xxxxxxx</Text></Text>
        <Text style={styles.textStyle}>Phone Number: <Text style={styles.lighterText}>xxxxxxx</Text></Text>
        <Text style={styles.textStyle}>Age: <Text style={styles.lighterText}>21</Text></Text>
        <Text style={styles.textStyle}>Gender: <Text style={styles.lighterText}>Female</Text></Text>
        <Text style={styles.textStyle}>Address: <Text style={styles.lighterText}>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</Text></Text>
        <View style={styles.govID}>
            <Text style={styles.textStyle}>Govt. ID: <Text style={styles.lighterText}>xxxxxxx</Text></Text>
            <Text style={styles.gov}>Aadhar Card</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'stretch',
    backgroundColor: "#000",
    padding: 25,
    paddingBottom: 10,
    paddingTop: StatusBar.currentHeight || 20,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 20,
  },
  profileImage: {
    width: 128,
    height: 128,
    borderRadius: 100,
  },
  name: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "600",
  },
  email: {
    color: "#ccc",
    fontSize: 14,
  },
  alignCenter: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 10, // Adjusted margin to provide spacing between username and personal details
  },
  textStyle: {
    color: "#ccc",
    fontSize: 16,
    marginBottom: 14,
    fontWeight: 500,
  },
  lighterText: {
    fontWeight: 400,
    fontSize: 14,
  },
  placeTop: {
    marginTop: 20,  // Add margin-top to provide space between username and personal details
  },
  govID: {
    flexDirection: 'row',  // Aligns Govt. ID and Aadhar Card horizontally
    justifyContent: 'space-between',  // Ensures space between elements
    alignItems: 'center',  // Vertically centers the elements
  },
  gov: {
    color: '#bbb',
    fontSize: 14,
    fontWeight: '400', // Optional for styling
  }
});
