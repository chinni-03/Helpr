import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: "https://via.placeholder.com/100" }} // Replace with your profile image URL
          style={styles.profileImage}
        />
        <View>
          <Text style={styles.name}>Harshini</Text>
          <Text style={styles.email}>Email address</Text>
        </View>
      </View>

      {/* Settings Options */}
      <View style={styles.optionsContainer}>
        {[
          "Personal Details",
          "Volunteer Details",
          "Emergency Contact Details",
          "Payments and Subscription",
          "Parental Controls",
          "Privacy and Policy",
        ].map((option, index) => (
          <TouchableOpacity key={index} style={styles.option}>
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Log out Button */}
      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", // Black background
    padding: 20,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30, // Makes it circular
    marginRight: 15,
  },
  name: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  email: {
    color: "#ccc",
    fontSize: 14,
  },
  optionsContainer: {
    flex: 1,
    marginBottom: 20,
  },
  option: {
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    paddingVertical: 15,
  },
  optionText: {
    color: "#fff",
    fontSize: 16,
  },
  logoutButton: {
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#fff",
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});
