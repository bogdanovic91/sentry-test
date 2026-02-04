import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import * as Sentry from '@sentry/react-native';

const HomeScreen = () => {
  // JS Crash Scenarios
  
  const testUndefinedError = () => {
    // Access property on undefined
    const obj: any = undefined;
    console.log(obj.property.nested);
  };

  const testNullReferenceError = () => {
    // Access property on null
    const obj: any = null;
    obj.method();
  };

  const testThrowError = () => {
    // Explicitly throw an error
    throw new Error('Test Error: This is an intentional error thrown to test Sentry');
  };

  const testAsyncError = async () => {
    // Async error
    await new Promise((resolve) => setTimeout(resolve, 100));
    throw new Error('Test Async Error: This is an asynchronous error');
  };

  const testPromiseRejection = () => {
    // Unhandled promise rejection
    Promise.reject(new Error('Test Promise Rejection: Unhandled promise rejection'));
  };

  const testTypeError = () => {
    // Type error
    const num: any = null;
    num.toFixed(2);
  };

  const testReferenceError = () => {
    // Reference error - accessing undefined variable
    // @ts-ignore
    console.log(undefinedVariable.property);
  };

  const testDivisionByZero = () => {
    // This won't crash in JS but will produce Infinity
    // Let's force an actual crash
    const result = 1 / 0;
    // Access property on Infinity (won't crash, so throw instead)
    if (!isFinite(result)) {
      throw new Error('Test Math Error: Division resulted in Infinity');
    }
  };

  const testNestedError = () => {
    const level3 = () => {
      throw new Error('Test Nested Error: Error from deeply nested function');
    };
    const level2 = () => level3();
    const level1 = () => level2();
    level1();
  };

  const testSentryCapture = () => {
    // Manually capture an exception with Sentry
    try {
      throw new Error('Test Manual Sentry Capture: This error was manually captured');
    } catch (error) {
      Sentry.captureException(error);
      Alert.alert('Success', 'Error manually captured and sent to Sentry');
    }
  };

  const testSentryMessage = () => {

    Sentry.showFeedbackWidget();
    // Send a message to Sentry
    // Sentry.captureMessage('Test Message: This is a test message sent to Sentry', 'info');
    // Alert.alert('Success', 'Message sent to Sentry');
    Sentry.hideFeedbackButton();

  };

  const testNativeCrash = () => {
    // Trigger a native crash
    Sentry.nativeCrash();
  };

  const testCustomException = () => {
    // Custom error with additional context
    Sentry.withScope((scope) => {
      scope.setTag('crash-test', 'custom-exception');
      scope.setLevel('error');
      scope.setContext('test-context', {
        testType: 'custom',
        timestamp: new Date().toISOString(),
      });
      Sentry.captureException(new Error('Test Custom Exception: Error with custom context'));
    });
    Alert.alert('Success', 'Custom exception with context sent to Sentry');
  };

  const testBreadcrumbs = () => {
    // Add breadcrumbs and then throw an error
    Sentry.addBreadcrumb({
      category: 'test',
      message: 'User clicked breadcrumb test button',
      level: 'info',
    });
    Sentry.addBreadcrumb({
      category: 'navigation',
      message: 'Navigated to test screen',
      level: 'info',
    });
    Sentry.addBreadcrumb({
      category: 'action',
      message: 'About to trigger error',
      level: 'warning',
    });
    throw new Error('Test Breadcrumbs: Error with breadcrumb trail');
  };

  const BUTTON_COLORS = [
    '#7b3ff2', '#e91e63', '#2196f3', '#00bcd4', '#4caf50',
    '#8bc34a', '#ff9800', '#ff5722', '#9c27b0', '#3f51b5',
    '#009688', '#795548', '#607d8b', '#dc3545',
  ];

  const CrashButton = ({ title, badge, onPress, color = '#7b3ff2' }: any) => (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.buttonContent}>
        <Text style={styles.buttonText} numberOfLines={2}>
          {title}
        </Text>
        <View style={styles.pillBadge}>
          <Text style={styles.pillBadgeText}>{badge}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>JavaScript Errors</Text>
        
        <CrashButton
          title="Undefined Error"
          badge="JS"
          onPress={testUndefinedError}
          color={BUTTON_COLORS[0]}
        />

        <CrashButton
          title="Null Reference Error"
          badge="JS"
          onPress={testNullReferenceError}
          color={BUTTON_COLORS[1]}
        />

        <CrashButton
          title="Throw Error"
          badge="JS"
          onPress={testThrowError}
          color={BUTTON_COLORS[2]}
        />

        <CrashButton
          title="Async Error"
          badge="JS"
          onPress={testAsyncError}
          color={BUTTON_COLORS[3]}
        />

        <CrashButton
          title="Promise Rejection"
          badge="JS"
          onPress={testPromiseRejection}
          color={BUTTON_COLORS[4]}
        />

        <CrashButton
          title="Type Error"
          badge="JS"
          onPress={testTypeError}
          color={BUTTON_COLORS[5]}
        />

        <CrashButton
          title="Reference Error"
          badge="JS"
          onPress={testReferenceError}
          color={BUTTON_COLORS[6]}
        />

        <CrashButton
          title="Math Error (Division)"
          badge="JS"
          onPress={testDivisionByZero}
          color={BUTTON_COLORS[7]}
        />

        <CrashButton
          title="Nested Error"
          badge="JS"
          onPress={testNestedError}
          color={BUTTON_COLORS[8]}
        />

        <CrashButton
          title="Breadcrumbs + Error"
          badge="JS"
          onPress={testBreadcrumbs}
          color={BUTTON_COLORS[9]}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sentry Features</Text>
        
        <CrashButton
          title="Manual Capture Exception"
          badge="Sentry"
          onPress={testSentryCapture}
          color={BUTTON_COLORS[10]}
        />

        <CrashButton
          title="Send Message to Sentry"
          badge="Sentry"
          onPress={testSentryMessage}
          color={BUTTON_COLORS[11]}
        />

        <CrashButton
          title="Custom Exception + Context"
          badge="Sentry"
          onPress={testCustomException}
          color={BUTTON_COLORS[12]}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Native Crash</Text>
        
        <CrashButton
          title="⚠️ Native Crash (Hard Crash)"
          badge="Native"
          onPress={testNativeCrash}
          color={BUTTON_COLORS[13]}
        />
        
        <Text style={styles.warningText}>
          Warning: Native crash will force close the app immediately
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
  button: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    paddingRight: 12,
  },
  pillBadge: {
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  pillBadgeText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },
  warningText: {
    fontSize: 12,
    color: '#dc3545',
    fontStyle: 'italic',
    marginTop: 8,
    textAlign: 'center',
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

export default HomeScreen;
