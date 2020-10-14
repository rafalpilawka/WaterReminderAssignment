# Simple water drinking reminder.
# Build with usage of EXPO SDK 39 with react native 0.63 and typescript

# Packages
    react-native-community/async-storage: "~1.12.0",
    expo: "~39.0.2",
    expo-notifications: "~0.7.2",
    expo-status-bar: "~1.0.2",
    firebase: "7.9.0",
    moment: "^2.29.1",
    react: "16.13.1",
    react-dom: "16.13.1",
    react-native: "https://github.com/expo/react-native/archive/sdk-39.0.3.tar.gz",
    react-native-web: "~0.13.12"

# Authorization is using basic authorization with credentials from firebase
    Test credentials: 
    email: test@test.pl
    password: qwerty123

# Push notifications are triggered when user is logged inand persist until logout.
# Specific time of scheduled notifications is set in scheduleNotificationsForSession function   in ./src/services/notifications.ts file 