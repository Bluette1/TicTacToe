import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, ImageBackground, Pressable } from "react-native";
import bg from "./assets/bg.jpeg";

export default function App() {
  const [map, setmap] = useState([
    ["O", "", "O"],
    ["", "X", "X"],
    ["O", "", ""],
  ]);

  const onPress = () => {
    console.warn("hello");
  };
  return (
    <View style={styles.container}>
      <ImageBackground source={bg} style={styles.bg} resizeMode="contain">
        <View style={styles.map}>
          {map.map((row) => (
            <View style={styles.row}>
              {row.map((cell) => (
                <Pressable onPress={() => onPress()} style={styles.cell}>
                  {cell === "O" && <View style={styles.circle}></View>}
                  {cell === "X" && (
                    <View style={styles.cross}>
                      <View style={styles.crossLine}></View>
                      <View
                        style={[styles.crossLine, styles.crossLineReversed]}
                      ></View>
                    </View>
                  )}
                </Pressable>
              ))}
            </View>
          ))}
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
    flex: 1,
    borderWidth: 10,
    borderColor: "white",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  cross: { width: "100%", height: "100%", borderWidth: 2, borderColor: "red" },
  map: {
    borderWidth: 10,
    borderColor: "white",
    width: "80%",
    aspectRatio: 1,
    padding: 5,
  },
  row: {
    flex: 1,
    flexDirection: "row",
  },
  cell: {
    flex: 1,
    borderWidth: 1,
    borderColor: "white",
  },
  crossLine: {
    position: "absolute",
    left: "48%",
    width: 10,
    height: "100%",
    borderRadius: 5,
    backgroundColor: "white",
    transform: [{ rotate: "45deg" }],
  },
  crossLineReversed: {
    transform: [{ rotate: "-45deg" }],
  },
});
