import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from './components/SplashScreenView';
import HomeScreen from './components/HomeScreen';
import SettingsScreen from './components/SettingsScreen';
import LoginScreen from './components/LoginScreen';
import NewUserScreen from './components/NewUserScreen';
import PersonalDetails from './components/PersonalDetails';
import PrivacyAndPolicy from './components/PrivacyAndPolicy';
import ParentalControls from './components/ParentalControls';
import PaymentsAndSubscription from './components/PaymentsAndSubscription';
import EmergencyContactDetails from './components/EmergencyContactDetails';
import VolunteerDetails from './components/VolunteerDetails';
import ExistingUser from './components/ExistingUser';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 250);

    return () => clearTimeout(timer); // Clean up timeout on unmount
  }, []);

  const Stack = createNativeStackNavigator();

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="ExistingUser" component={ExistingUser} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="NewUser" component={NewUserScreen} />
        <Stack.Screen name="PersonalDetails" component={PersonalDetails} />
        <Stack.Screen name="VolunteerDetails" component={VolunteerDetails} />
        <Stack.Screen
          name="EmergencyContactDetails"
          component={EmergencyContactDetails}
        />
        <Stack.Screen
          name="PaymentsAndSubscription"
          component={PaymentsAndSubscription}
        />
        <Stack.Screen name="ParentalControls" component={ParentalControls} />
        <Stack.Screen name="PrivacyAndPolicy" component={PrivacyAndPolicy} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
