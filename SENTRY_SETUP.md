# Sentry Configuration Guide

## Getting Your Sentry DSN

To properly test crash reporting, you need to set up a Sentry account and configure your DSN (Data Source Name).

### Step 1: Create a Sentry Account

1. Go to [https://sentry.io/signup/](https://sentry.io/signup/)
2. Sign up for a free account
3. Confirm your email address

### Step 2: Create a New Project

1. After logging in, click "Create Project"
2. Select "React Native" as the platform
3. Choose "Expo" as the framework (optional)
4. Name your project (e.g., "sentry-test")
5. Click "Create Project"

### Step 3: Get Your DSN

After creating the project, you'll see a setup guide with your DSN. It looks like:

```
https://[key]@[organization].ingest.sentry.io/[project-id]
```

Example:
```
https://abc123def456@o123456.ingest.sentry.io/7891011
```

### Step 4: Configure the App

1. Open `App.tsx` in your code editor
2. Find the Sentry initialization code:

```typescript
Sentry.init({
  dsn: 'https://your-dsn@sentry.io/your-project-id',
  // ... other config
});
```

3. Replace the placeholder DSN with your actual DSN
4. Save the file

## Testing Crashes

### JavaScript Errors

After configuring your DSN:

1. Run the app: `npm start` or `npm run ios` / `npm run android`
2. Navigate to the "Home" tab
3. Tap any of the JavaScript error buttons
4. The error will be captured and sent to Sentry
5. Check your Sentry dashboard at https://sentry.io/ to see the error

### Native Crashes

**Warning**: The "Native Crash" button will force close your app immediately!

1. Tap the "Native Crash" button
2. The app will crash and close
3. Restart the app
4. The crash report will be sent to Sentry on the next app launch
5. Check your Sentry dashboard to see the native crash report

## Understanding Error Types

### Basic JavaScript Errors
- **Undefined Error**: Accessing properties on `undefined`
- **Null Reference Error**: Calling methods on `null`
- **Type Error**: Invalid type operations
- **Reference Error**: Accessing undeclared variables

### Advanced Scenarios
- **Async Error**: Errors in async functions
- **Promise Rejection**: Unhandled promise rejections
- **Nested Error**: Errors from deep call stacks with stack traces
- **Breadcrumbs**: Errors with event trail leading up to the crash

### Sentry Features
- **Manual Capture**: Explicitly capture and send errors
- **Messages**: Send informational messages (not errors)
- **Custom Context**: Add custom data, tags, and metadata to errors

## Verifying Sentry Integration

To verify your Sentry integration is working:

1. In the app, tap "Send Message to Sentry" (green button)
2. You should see an alert saying "Message sent to Sentry"
3. Check your Sentry dashboard - you should see a new message event
4. If you don't see it, verify your DSN is correct

## Troubleshooting

### Errors Not Appearing in Sentry

1. **Check your DSN**: Make sure it's correctly copied from Sentry
2. **Check network**: Ensure your device/emulator has internet access
3. **Development Mode**: Some errors may be caught by React Native's error boundary in development
4. **Wait**: Sometimes it takes a few seconds for events to appear in Sentry

### App Won't Start

1. **Install dependencies**: Run `npm install`
2. **Clear cache**: Run `npx expo start -c`
3. **Check Expo CLI**: Make sure you have the latest version

### Asset Errors

If you see errors about missing assets:
1. The assets (icon, splash, etc.) are already included
2. They're simple colored placeholders - you can replace them with your own images

## Additional Resources

- [Sentry React Native Documentation](https://docs.sentry.io/platforms/react-native/)
- [Expo Documentation](https://docs.expo.dev/)
- [React Navigation Documentation](https://reactnavigation.org/)

## Production Considerations

Before deploying to production:

1. **Environment Variables**: Store your DSN in environment variables, not hardcoded
2. **Source Maps**: Configure source map upload for better error debugging
3. **Release Tracking**: Set up release tracking to know which version has errors
4. **Performance Monitoring**: Enable performance monitoring for user experience insights
5. **Sampling Rate**: Adjust sampling rates based on your usage and Sentry plan

Example production configuration:

```typescript
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: __DEV__ ? 'development' : 'production',
  tracesSampleRate: __DEV__ ? 1.0 : 0.2,
  enabled: !__DEV__, // Only enable in production
  beforeSend(event) {
    // Filter out sensitive data
    if (event.user) {
      delete event.user.email;
    }
    return event;
  },
});
```
