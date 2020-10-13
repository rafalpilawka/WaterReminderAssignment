import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    paddingHorizontal: 15
  },
  textinput: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    width: "100%",
    marginBottom: 10
  },
  error: {
    borderColor: "red"
  },
  textError: {
    color: "red"
  },
  button: {
    fontSize: 24,
    color: "blue",
    marginTop: 10,
  }
});
