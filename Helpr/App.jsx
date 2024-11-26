
import SplashScreen from './components/SplashScreenView';
import { useEffect, useState } from 'react';
import HomeScreen from './components/HomeScreen';
import { NativeScreenNavigationContainer, ScreenStack } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingsScreen from './components/SettingsScreen';
import LoginScreen from './components/LoginScreen'; // Replace with the correct file path
import NewUserScreen from './components/NewUserScreen'; // Replace with the correct file path
import PersonalDetails from './components/PersonalDetails';

export default function App() {

  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 250);
  })

  const Stack = createNativeStackNavigator();

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
              name="Home"
              component={HomeScreen} 
              options={{ headerShown: false }}
            />
          <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="NewUser"
            component={NewUserScreen}
            options={{ title: 'New User Registration' }}
          />
          <Stack.Screen
            name="PersonalDetails"
            component={PersonalDetails}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
