import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { clearUserToken } from '../Backend/authSlice'; // Import clearUserToken action
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userToken = useSelector((state) => state.auth.userToken);

  const handleLogout = () => {
    dispatch(clearUserToken()); // Clear the user token from Redux
    navigation.navigate('Login'); // Navigate back to LoginScreen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>
        {userToken ? 'Welcome back!' : 'Please log in.'}
      </Text>
      {userToken && (
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
