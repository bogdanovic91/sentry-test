import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Sentry from '@sentry/react-native';
import HomeScreen from './src/screens/HomeScreen';
import SettingsScreen from './src/screens/SettingsScreen';

// Initialize Sentry
Sentry.init({
  dsn: 'https://your-dsn@sentry.io/your-project-id',
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  tracesSampleRate: 1.0,
  // Enable all automatic instrumentation
  enableAutoSessionTracking: true,
  // Session close timeout
  sessionTrackingIntervalMillis: 30000,
  // Enable native crash reporting
  enableNativeCrashHandling: true,
  // Enable auto breadcrumbs
  enableAutoPerformanceTracing: true,
});

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#7b3ff2',
          tabBarInactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
            title: 'Home',
          }}
        />
        <Tab.Screen 
          name="Settings" 
          component={SettingsScreen}
          options={{
            title: 'Settings',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Sentry.wrap(App);
