import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

export default function ExistingUser({navigation}) {

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome back!</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your phone number/email"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        placeholderTextColor="#aaa"
        secureTextEntry
      />

      <View style={styles.linkContainer}>
        <TouchableOpacity>
          <Text style={styles.link}>Forgot Password</Text>
        </TouchableOpacity>
        
        <TouchableOpacity>
          <Text style={styles.link}>Login using OTP</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Log in</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.newUserButton} onPress={() => navigation.navigate("NewUser")}>
        <Text style={styles.newUserButtonText}>I'm new here!</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  input: {
    color: '#fff',
    borderBottomColor: '#fff', // White bottom border color
    borderBottomWidth: 1,
    paddingHorizontal: 15,
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
    color: '#aaa',
    fontSize: 14,
    textDecorationLine: 'underline'
  },
  loginButton: {
    backgroundColor: 'transparent',
    borderColor: '#fff', // Corrected property name
    borderWidth: 1, // Added borderWidth to make the border visible
    paddingVertical: 20,
    alignItems: 'center',
    marginBottom: 20,
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