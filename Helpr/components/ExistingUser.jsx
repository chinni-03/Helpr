import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

export default function ExistingUser({navigation}) {

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
        />
      </View>

      <View style={styles.subcontainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="#aaa"
          secureTextEntry
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
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Log in</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.newUserButton} onPress={() => navigation.navigate("NewUser")}>
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
    borderBottomColor: '#fff', // White bottom border color
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
    textDecorationLine: 'underline'
  },
  buttonContainer: {
    gap: 20
  },
  loginButton: {
    backgroundColor: 'transparent',
    borderColor: '#fff', // Corrected property name
    borderWidth: 1, // Added borderWidth to make the border visible
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