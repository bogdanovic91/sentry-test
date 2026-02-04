import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import * as Sentry from '@sentry/react-native';

const SettingsScreen = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>App Name:</Text>
          <Text style={styles.value}>Sentry Test</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Version:</Text>
          <Text style={styles.value}>1.0.0</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Purpose:</Text>
          <Text style={styles.value}>Demo Sentry crash monitoring</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sentry Configuration</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>SDK:</Text>
          <Text style={styles.value}>@sentry/react-native</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Auto Session Tracking:</Text>
          <Text style={styles.value}>Enabled</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Native Crash Handling:</Text>
          <Text style={styles.value}>Enabled</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Performance Tracing:</Text>
          <Text style={styles.value}>Enabled</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Instructions</Text>
        <Text style={styles.instructionText}>
          1. Configure your Sentry DSN in App.tsx{'\n'}
          2. Go to the Home tab{'\n'}
          3. Test various crash scenarios{'\n'}
          4. Check your Sentry dashboard to see captured errors{'\n'}
          5. Each button demonstrates a different type of crash or error
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Crash Types Available</Text>
        <Text style={styles.instructionText}>
          • JavaScript Errors (undefined, null reference, type errors){'\n'}
          • Async Errors (promises, async/await){'\n'}
          • Manual Sentry Captures{'\n'}
          • Custom Exceptions with Context{'\n'}
          • Breadcrumb Tracking{'\n'}
          • Native Crashes (force closes app)
        </Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Sentry Test App • Built with React Native & Expo
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  scrollContent: {
    paddingTop: 20,
  },
  section: {
    padding: 20,
    backgroundColor: '#1a1a1a',
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
  },
  label: {
    fontSize: 16,
    color: '#999',
  },
  value: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
  instructionText: {
    fontSize: 14,
    color: '#999',
    lineHeight: 22,
  },
  footer: {
    padding: 20,
    backgroundColor: '#1a1a1a',
    marginTop: 10,
    marginBottom: 20,
  },
  footerText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default SettingsScreen;
