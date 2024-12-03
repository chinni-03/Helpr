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
} from 'react-native';

export default function NewUserScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

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
            navigation.navigate('Login'); // Navigate back to the login screen
        } catch (error) {
            console.error('Error during registration:', error);
            alert(error.message);
        }
    };

    // Function to read common passwords from a .txt file
    const readCommonPasswords = async () => {
        try {
            // Path to the text file in your app's asset directory
            const fileUri = FileSystem.documentDirectory + '../assets/commonPasswords.txt'; // Adjust the path as needed
            
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
            <Text style={styles.header}>Hello there!</Text>
            <Text style={styles.subHeader}>Welcome aboard!</Text>

            <TextInput
                style={styles.input}
                placeholder="Phone Number/ Email"
                placeholderTextColor="#888"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#888"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor="#888"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />

            <TouchableOpacity style={styles.proceedButton} onPress={handleProceed}>
                <Text style={styles.buttonText}>Proceed</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.existingUserButton}
                onPress={() => navigation.navigate('ExistingUser')}
            >
                <Text style={styles.existingUserText}>I'm an existing user!</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        padding: 20,
        justifyContent: 'center',
    },
    header: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 5,
    },
    subHeader: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#1c1c1c',
        color: '#fff',
        padding: 15,
        borderRadius: 5,
        marginBottom: 15,
    },
    proceedButton: {
        backgroundColor: '#000',
        borderWidth: 1,
        borderColor: '#fff',
        padding: 15,
        borderRadius: 5,
        marginBottom: 15,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    existingUserButton: {
        backgroundColor: '#d3d3d3',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    existingUserText: {
        color: '#000',
        fontWeight: 'bold',
    },
});
