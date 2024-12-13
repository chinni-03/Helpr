import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { setUserToken } from './Backend/authSlice';
import { auth } from './Backend/FirebaseInitialization';
import { store } from './Backend/store'; // Import your store
import AsyncStorage from '@react-native-async-storage/async-storage';

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
import VolunteerConsent from './components/VolunteerConsent';
import ReportZone from './components/ReportZone';
import SelectZone from './components/SelectZone';


function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [loading, setLoading] = useState(true);
  const userToken = useSelector((state) => state.auth.userToken); // Get userToken from Redux
  const dispatch = useDispatch();

  useEffect(() => {
    const checkToken = async () => {
      const storedToken = await AsyncStorage.getItem('userToken');
      if (storedToken) {
        dispatch(setUserToken(storedToken)); // Set the token if available
      }
      setLoading(false);
    };

    checkToken();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUserToken(user.uid)); // Set the token if user is logged in
      } else {
        dispatch(setUserToken(null)); // Clear token if user is not logged in
      }
    });

    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 250);

    return () => {
      unsubscribe();
      clearTimeout(timer);
    };
  }, [dispatch]);

  if (loading) {
    return null; // Show a loading screen while determining the token
  }

  const Stack = createNativeStackNavigator();

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {userToken ? (
          <Stack.Screen name="Home" component={HomeScreen} />
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="ExistingUser" component={ExistingUser} />
          </>
        )}
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="NewUser" component={NewUserScreen} />
        <Stack.Screen name="PersonalDetails" component={PersonalDetails} />
        <Stack.Screen name="VolunteerDetails" component={VolunteerDetails} />
        <Stack.Screen name="EmergencyContactDetails" component={EmergencyContactDetails} />
        <Stack.Screen name="PaymentsAndSubscription" component={PaymentsAndSubscription} />
        <Stack.Screen name="ParentalControls" component={ParentalControls} />
        <Stack.Screen name="PrivacyAndPolicy" component={PrivacyAndPolicy} />
        <Stack.Screen name="VolunteerConsent" component={VolunteerConsent} />
        <Stack.Screen name="ReportZone" component={ReportZone} />
        <Stack.Screen name="SelectZone" component={SelectZone} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function Main() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
