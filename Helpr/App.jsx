
import SplashScreen from './components/SplashScreenView';
import { useEffect, useState } from 'react';
import HomeScreen from './components/HomeScreen';
import { NativeScreenNavigationContainer, ScreenStack } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function App() {

  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 750);
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
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
