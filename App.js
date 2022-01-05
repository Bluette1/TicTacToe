import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import { TouchableWithoutFeedback } from "react-native-web";
import bg from "./assets/bg.jpeg";

export default function App() {
  return (
    <View style={styles.container}>
      <ImageBackground source={bg} style={styles.bg} resizeMode="contain">
        <View style={styles.map}>
          <View style={styles.circle}></View>
          <View style={styles.cross}>
            <View style={styles.crossLine}></View>
            <View style={[styles.crossLine, styles.crossLineReversed]}></View>
          </View>
        </View>
      </ImageBackground>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#242D34",
    alignItems: "center",
    justifyContent: "center",
  },
  bg: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 15,
  },
  circle: {
    position: "absolute",
    left: 1 * 87,
    top: 2 * 92,
    height: 73,
    width: 73,
    borderWidth: 10,
    borderColor: "white",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  cross: { width: 75, height: 75},
  map: {
    borderWidth: 10,
    borderColor: "white",
    width: "80%",
    aspectRatio: 1,
  },
  crossLine: {
    position: "absolute",
    left: 32.5,
    width: 10,
    height: 70,
    borderRadius: 5,
    backgroundColor: "white",
    transform: [{ rotate: "45deg" }],
  },
  crossLineReversed: {
    transform: [{ rotate: "-45deg" }],
  },
});
