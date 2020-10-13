import React, { useState } from "react";
import {
  TextInput,
  View,
  Pressable,
  Text,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { UserCredentialsT } from "../../types/types";
import { styles } from "./styles";

type PropsT = {
  submitLogin: ({ email, password }: UserCredentialsT) => void;
  error: boolean;
};

export default function({ submitLogin, error }: PropsT) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const _handleSubmit = () => {
    submitLogin({ email, password });
  };

  React.useEffect(() => {
    return () => {
      console.log("unmount");
    };
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.container}>
        <TextInput
          style={[styles.textinput, error && styles.error]}
          autoCapitalize="none"
          value={email}
          onChangeText={(text: string) => setEmail(text)}
          placeholder="email"
          keyboardType="email-address"
        />
        <TextInput
          secureTextEntry={true}
          style={[styles.textinput, error && styles.error]}
          autoCapitalize="none"
          value={password}
          onChangeText={(text: string) => setPassword(text)}
          placeholder="password"
        />
        {error && <Text style={styles.textError}>Bad credentials</Text>}
        <Pressable onPress={_handleSubmit}>
          <Text style={styles.button}>Login</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}
