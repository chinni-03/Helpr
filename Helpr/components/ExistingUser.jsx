import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Backend/FirebaseInitialization';
import { useDispatch } from 'react-redux';
import { setUserToken } from '../Backend/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function ExistingUser() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await AsyncStorage.getItem("userToken");
        if (token) {
          console.log("Token exists, redirecting to Home");
          navigation.navigate('Home');

        }
      }
    });
    return () => unsubscribe();
  }, [navigation]);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userToken = userCredential.user.uid;
      await AsyncStorage.setItem("userToken", userToken);
      dispatch(setUserToken(userToken));
      Alert.alert('Success', 'Login successful!');
      navigation.navigate('Home');
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome back!</Text>

      <View style={styles.subcontainer}>
        <Text style={styles.label}>Phone Number/Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your phone number/email"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.subcontainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <View style={styles.linkContainer}>
        <TouchableOpacity>
          <Text style={styles.link}>Forgot Password</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.link}>Login using OTP</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Log in</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.newUserButton}
          onPress={() => navigation.navigate('NewUser')}
        >
          <Text style={styles.newUserButtonText}>I'm new here!</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    paddingHorizontal: 50,
    gap: 20,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  subcontainer: {
    gap: 10,
  },
  label: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 16,
  },
  input: {
    color: '#fff',
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  link: {
    color: '#fff',
    opacity: 0.7,
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    gap: 20,
  },
  loginButton: {
    backgroundColor: 'transparent',
    borderColor: '#fff',
    borderWidth: 1,
    paddingVertical: 20,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  newUserButton: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    alignItems: 'center',
  },
  newUserButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
