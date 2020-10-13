import React from "react";
import { View, Text, Pressable, Animated } from "react-native";
import { styles } from "./styles";

type PropsT = {
  value: number | undefined;
  onFill(): void;
};

export default function App({ value, onFill }: PropsT) {
  const _renderPortion = () => {
    const matrix = new Array(value).fill(1);
    return matrix.map((_, idx) => <View key={`${idx}`} style={styles.fill} />);
  };

  return (
    <View style={styles.container}>
      {value === 8 &&
        <Text style={styles.informationText}>
          Enough for today! Go to sleep
        </Text>}
      <View style={styles.waterContainerTop} />
      <View style={styles.waterContainer}>
        {_renderPortion()}
      </View>
      <Pressable onPress={onFill}>
        <Text style={styles.button}>Drink a glass</Text>
      </Pressable>
    </View>
  );
}
