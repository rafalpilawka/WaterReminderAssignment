import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import { Platform } from "react-native";

const names = [
  "first",
  "second",
  "third",
  "fouth",
  "fifth",
  "sixth",
  "seventh",
  "eigth"
];

export async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C"
    });
  }

  return token;
}

export const cancelScheduledNotifications = () =>
  Notifications.cancelAllScheduledNotificationsAsync();

export const scheduleNotificationsForSession = () => {
  names.forEach((el, i) =>
    Notifications.scheduleNotificationAsync({
      content: {
        title: `${el} glass`,
        body: "Drink it now!"
      },
      trigger: {
        hour: i * 2 + 7,
        minute: 30,
        repeats: true
      }
    })
  );
};
