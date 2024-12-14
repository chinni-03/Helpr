import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Backend/FirebaseInitialization'; // Adjust the path to your firebase.js
import * as FileSystem from 'expo-file-system';
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

    // Function to handle user registration
    const handleProceed = async () => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        // Read common passwords from a .txt file
        const commonPasswords = await readCommonPasswords();

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        if (!passwordRegex.test(password)) {
            alert(
                'Password must be at least 8 characters long and include:\n' +
                '- At least one uppercase letter\n' +
                '- At least one lowercase letter\n' +
                '- At least one number\n' +
                '- At least one special character (@, $, !, %, *, ?, &)'
            );
            return;
        }

        if (commonPasswords.includes(password)) {
            alert('This password is too common. Please choose a stronger, more unique password.');
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            alert('Registration Successful');
            console.log('User created:', userCredential.user);
            navigation.navigate('VolunteerConsent'); // Navigate back to the login screen
        } catch (error) {
            console.error('Error during registration:', error);
            alert(error.message);
        }
    };

    // Function to read common passwords from a .txt file
    const readCommonPasswords = async () => {
        try {
            // Path to the text file in your app's asset directory
            const fileUri = FileSystem.documentDirectory + '../assets/CommonPasswords.txt'; // Adjust the path as needed
            
            // Read the file content
            const fileContents = await FileSystem.readAsStringAsync(fileUri);
            
            // Split the file content into an array of passwords
            return fileContents.split('\n').map(password => password.trim());
        } catch (error) {
            console.error('Error reading common passwords file:', error);
            return [];
        }
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
