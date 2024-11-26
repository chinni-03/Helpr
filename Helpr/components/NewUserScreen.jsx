import React, { useState } from 'react';
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

    const handleProceed = () => {
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        alert('Registration Successful');
        // Navigate back to the login screen
        navigation.navigate('Login');
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
                onPress={() => navigation.navigate('Login')}
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
