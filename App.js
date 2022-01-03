import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import bg from "./assets/bg.jpeg";

export default function App() {
  return (
    <View style={styles.container}>
      <ImageBackground source={bg} style={styles.bg} resizeMode="contain">
        <StatusBar style="auto" />
        <View style={styles.circle}>
          <View style={styles.innerCircle}></View>
        </View>
        <View>
          <View styles={styles.crossLine}></View>
          <View styles={styles.crossLine}></View>
        </View>
      </ImageBackground>
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
    height: 75,
    width: 75,
    backgroundColor: "white",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  innerCircle: {
    height: 50,
    width: 50,
    backgroundColor: "#242D34",
    borderRadius: 50,
  },
  crossLine: {
    backgroundColor: "white",
    height: 50,
    width: 10
  }
});
