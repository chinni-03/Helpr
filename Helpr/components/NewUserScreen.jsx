import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function NewUserScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleProceed = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert("Registration Successful");
    // Navigate back to the login screen
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>Hello there!</Text>
        <Text style={styles.subHeader}>Welcome aboard!</Text>
      </View>

      <View style={styles.subcontainer}>
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your phone number"
          placeholderTextColor="#888"
          value={phone}
          onChangeText={setPhone}
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email address"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.label}>Create Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Create a new password"
          placeholderTextColor="#888"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirm your Password"
          placeholderTextColor="#888"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.proceedButton} onPress={handleProceed}>
          <Text style={styles.buttonText}>Proceed</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.existingUserButton}
          onPress={() => navigation.navigate("ExistingUser")}
        >
          <Text style={styles.existingUserText}>I'm an existing user!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingHorizontal: 50,
    paddingVertical: 25,
    justifyContent: "center",
    gap: 20,
  },
  label: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 16,
  },
  header: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subHeader: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  subcontainer: {
    gap: 10,
  },
  input: {
    color: "#fff",
    borderBottomColor: "#fff", // White bottom border color
    borderBottomWidth: 1,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    gap: 20,
  },
  proceedButton: {
    backgroundColor: "#000",
    borderWidth: 1,
    borderColor: "#fff",
    padding: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  existingUserButton: {
    backgroundColor: "#fff",
    padding: 20,
    borderWidth: 1,
    borderColor: "#fff",
    alignItems: "center",
  },
  existingUserText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});
