import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    paddingHorizontal: 15,
    alignItems: "center"
  },
  waterContainer: {
    width: 140,
    borderRadius: 10,
    height: 316,
    borderWidth: 5,
    borderColor: "black",
    justifyContent: "flex-end",
    paddingHorizontal: 2
  },
  waterContainerTop: {
    height: 10,
    backgroundColor: "black",
    width: 40,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    marginTop: 20
  },
  textinput: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    width: "100%",
    marginBottom: 10
  },
  fill: {
    marginBottom: 2,
    backgroundColor: "blue",
    height: 36,
    width: "100%",
    position: "relative"
  },
  informationText: {
    fontWeight: "bold",
    fontSize: 16
  },
  button: {
    fontSize: 24,
    color: "blue",
    marginTop: 10
  }
});
