import { StatusBar } from "expo-status-bar";
import { Subscription } from "@unimodules/core";
import React, { useEffect, useState, useRef } from "react";
import { Pressable, Text, SafeAreaView, Alert } from "react-native";
import * as Notifications from "expo-notifications";
import { auth, firestore } from "./src/services/firebase";
import { generateDateString } from "./src/utils/dateUtils";
import AuhorizationScreen from "./src/screens/Authorization/AuthorizationScreen";
import MainScreen from "./src/screens/Main/MainScreen";
import {
  registerForPushNotificationsAsync,
  scheduleNotificationsForSession,
  cancelScheduledNotifications
} from "./src/services/notifications";
import { styles } from "./styles";
import AsyncStorage from "@react-native-community/async-storage";

export default function App() {
  const [user, setUser] = useState<any>();
  const [value, setValue] = useState<number>(0);
  const [lastUpdate, setLastUpdate] = useState<string>("");
  const [authError, setErrors] = useState(false);
  const notificationListener = useRef<Subscription>();
  const responseListener = useRef<Subscription>();

  useEffect(() => {
    registerForPushNotificationsAsync();
    auth.onAuthStateChanged(async (res: any) => {
      let userRef;
      const authUid = await AsyncStorage.getItem("@uid");
      if (!authUid && res) {
        const { uid } = res;
        await AsyncStorage.setItem("@uid", uid);
        scheduleNotificationsForSession();
        const userRef = firestore.doc(`users/${uid}`);
        setUser(userRef);
        let collectionPresent: any = await userRef.get();
        if (!collectionPresent.exists) {
          collectionPresent = await userRef.set({
            value: 0,
            date: generateDateString()
          });
        }
        const result = await collectionPresent.data();
        const present = generateDateString();
        if (result.date !== present) {
          collectionPresent = await userRef.set({
            value: 0,
            date: present
          });
          setValue(0);
          setLastUpdate(present);
        } else {
          setValue(result.value);
          setLastUpdate(result.date);
        }
      } else if (res) {
        const userRef = firestore.doc(`users/${authUid}`);
        const result: any = await (await userRef.get()).data();
        setValue(result.value);
        setLastUpdate(result.date);
        setUser(userRef);
      }
    });

    if (user) {
      notificationListener.current = Notifications.addNotificationReceivedListener(
        notification => {
          Alert.alert("Drink glass of water");
        }
      );
      responseListener.current = Notifications.addNotificationResponseReceivedListener(
        response => {}
      );
    }
    return () => {
      Notifications.removeNotificationSubscription(notificationListener as any);
      Notifications.removeNotificationSubscription(responseListener as any);
    };
  }, []);

  const _handleLogin = async ({
    email: UserEmail,
    password
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const response: firebase.auth.UserCredential = await auth.signInWithEmailAndPassword(
        UserEmail,
        password
      );
      setErrors(false);
      if (!response.user) return;
      const { user: { uid } } = response;
      setUser(uid);
    } catch (error) {
      setErrors(true);
    }
  };

  const _handleLogout = async () => {
    cancelScheduledNotifications();
    await AsyncStorage.removeItem("@uid");
    auth.signOut();
    setUser(undefined);
  };

  const _fillTheTank = async () => {
    try {
      const present = generateDateString();
      if (lastUpdate !== present) {
        setValue(0);
        setLastUpdate(present);
      }
      if (value < 8) {
        await user.set({
          value: value + 1,
          date: present
        });
        setValue(prev => (prev < 8 ? prev + 1 : prev));
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      {!user
        ? <AuhorizationScreen submitLogin={_handleLogin} error={authError} />
        : <MainScreen value={value} onFill={_fillTheTank} />}
      {user &&
        <Pressable onPress={_handleLogout}>
          <Text style={styles.logoutButton}>Logout</Text>
        </Pressable>}
    </SafeAreaView>
  );
}
