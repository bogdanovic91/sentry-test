# Sentry Test - React Native App

A comprehensive Expo React Native app demonstrating Sentry error monitoring and crash reporting with multiple test scenarios.

## Features

- **Bottom Tab Navigation**: Home and Settings tabs
- **Multiple Crash Scenarios**: Test various types of JavaScript and native crashes
- **Sentry Integration**: Full integration with @sentry/react-native
- **TypeScript Support**: Built with TypeScript for type safety

## Crash Test Scenarios

### JavaScript Errors
- Undefined Error
- Null Reference Error
- Throw Error
- Async Error
- Promise Rejection
- Type Error
- Reference Error
- Math Error (Division)
- Nested Error
- Breadcrumbs + Error

### Sentry Features
- Manual Capture Exception
- Send Message to Sentry
- Custom Exception with Context

### Native Crash
- Native Crash (force closes app)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Sentry

Before running the app, you need to configure your Sentry DSN:

1. Create a project in [Sentry.io](https://sentry.io/)
2. Get your DSN from the project settings
3. Open `App.tsx` and replace the placeholder DSN:

```typescript
Sentry.init({
  dsn: 'YOUR_SENTRY_DSN_HERE', // Replace this
  // ... other configuration
});
```

### 3. Run the App

For iOS:
```bash
npm run ios
```

For Android:
```bash
npm run android
```

For Web:
```bash
npm run web
```

Or use Expo Go:
```bash
npm start
```

## Usage

1. Launch the app
2. Navigate to the **Home** tab
3. Tap any button to trigger a specific crash scenario
4. Check your Sentry dashboard to see the captured errors
5. Visit the **Settings** tab for app information

## Project Structure

```
sentry-test/
├── App.tsx                 # Main app component with Sentry initialization
├── src/
│   └── screens/
│       ├── HomeScreen.tsx  # Home screen with crash test buttons
│       └── SettingsScreen.tsx # Settings and info screen
├── app.json               # Expo configuration
├── package.json           # Dependencies and scripts
└── tsconfig.json          # TypeScript configuration
```

## Technologies Used

- **Expo**: ~51.0.0
- **React Native**: 0.74.5
- **React Navigation**: Bottom tabs navigation
- **Sentry React Native**: ^5.16.0
- **TypeScript**: Type-safe development

## Important Notes

- The **Native Crash** button will immediately force close the app (this is expected behavior)
- Some errors might be caught by the React Native error boundary in development mode
- For production testing, build the app in release mode
- Make sure to configure your Sentry DSN before testing

## License

MIT
