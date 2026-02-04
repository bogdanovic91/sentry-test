import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as Sentry from "@sentry/react-native";
import HomeScreen from "./src/screens/HomeScreen";
import SettingsScreen from "./src/screens/SettingsScreen";

// Initialize Sentry
Sentry.init({
  dsn: "https://64fb54c22e15ed86284a70adbf3f700c@o4510826711744512.ingest.de.sentry.io/4510826714038352",
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  integrations: [
    Sentry.mobileReplayIntegration(),
    Sentry.feedbackIntegration({
      // Additional SDK configuration goes in here, for example:
      styles: {
        submitButton: {
          backgroundColor: "#6a1b9a",
        },
      },
      namePlaceholder: "Fullname",
    }),
  ],

  sendDefaultPii: true,

  // Enable Logs
  enableLogs: true,

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
          tabBarActiveTintColor: "#7b3ff2",
          tabBarInactiveTintColor: "gray",
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Home",
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            title: "Settings",
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Sentry.wrap(App);
