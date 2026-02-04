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
    // Send a message to Sentry
    Sentry.captureMessage('Test Message: This is a test message sent to Sentry', 'info');
    Alert.alert('Success', 'Message sent to Sentry');
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

  const CrashButton = ({ title, onPress, color = '#7b3ff2' }: any) => (
    <TouchableOpacity 
      style={[styles.button, { backgroundColor: color }]} 
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Sentry Crash Testing</Text>
        <Text style={styles.subtitle}>
          Test various crash scenarios to see how Sentry captures them
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>JavaScript Errors</Text>
        
        <CrashButton 
          title="Undefined Error" 
          onPress={testUndefinedError}
        />
        
        <CrashButton 
          title="Null Reference Error" 
          onPress={testNullReferenceError}
        />
        
        <CrashButton 
          title="Throw Error" 
          onPress={testThrowError}
        />
        
        <CrashButton 
          title="Async Error" 
          onPress={testAsyncError}
        />
        
        <CrashButton 
          title="Promise Rejection" 
          onPress={testPromiseRejection}
        />
        
        <CrashButton 
          title="Type Error" 
          onPress={testTypeError}
        />
        
        <CrashButton 
          title="Reference Error" 
          onPress={testReferenceError}
        />
        
        <CrashButton 
          title="Math Error (Division)" 
          onPress={testDivisionByZero}
        />
        
        <CrashButton 
          title="Nested Error" 
          onPress={testNestedError}
        />
        
        <CrashButton 
          title="Breadcrumbs + Error" 
          onPress={testBreadcrumbs}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sentry Features</Text>
        
        <CrashButton 
          title="Manual Capture Exception" 
          onPress={testSentryCapture}
          color="#28a745"
        />
        
        <CrashButton 
          title="Send Message to Sentry" 
          onPress={testSentryMessage}
          color="#28a745"
        />
        
        <CrashButton 
          title="Custom Exception + Context" 
          onPress={testCustomException}
          color="#28a745"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Native Crash</Text>
        
        <CrashButton 
          title="⚠️ Native Crash (Hard Crash)" 
          onPress={testNativeCrash}
          color="#dc3545"
        />
        
        <Text style={styles.warningText}>
          Warning: Native crash will force close the app immediately
        </Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Make sure to configure your Sentry DSN in App.tsx
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  section: {
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  button: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
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
    backgroundColor: '#fff',
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
