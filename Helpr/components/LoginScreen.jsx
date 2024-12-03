import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ExistingUser')}
      >
        <Text style={styles.buttonText}>Existing User</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.newUserButton]}
        onPress={() => navigation.navigate('NewUser')}
      >
        <Text style={[styles.buttonText, styles.newUserText]}>New User</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    gap: 20,
  },
  button: {
    width: '80%',
    paddingVertical: 25,
    borderWidth: 1,
    borderColor: '#fff',
    alignItems: 'center',
  },
  newUserButton: {
    backgroundColor: '#d3d3d3',
    borderColor: '#d3d3d3',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  newUserText: {
    color: '#000',
  },
});
