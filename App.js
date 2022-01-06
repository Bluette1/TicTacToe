import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  ImageBackground,
  Pressable,
  Alert,
} from "react-native";
import bg from "./assets/bg.jpeg";

export default function App() {
  const emptyMap = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  const [map, setMap] = useState(emptyMap);

  const [currentTurn, setCurrentTurn] = useState("X");

  const onPress = (rowIndex, columnIndex) => {
    console.warn("hello", rowIndex, columnIndex);
    if (map[rowIndex][columnIndex] !== "") {
      Alert.alert("Position already occupied");
      return;
    }

    setMap((existingMap) => {
      const updatedMap = [...existingMap];
      updatedMap[rowIndex][columnIndex] = currentTurn;
      return updatedMap;
    });

    setCurrentTurn(currentTurn === "X" ? "O" : "X");
    checkWinningState();
    checkTieState();
  };

  const checkWinningState = () => {
    // Check rows
    for (let i = 0; i < 3; i += 1) {
      const isRowXWinning = map[i].every((cell) => cell === "X");
      const isRowOWinning = map[i].every((cell) => cell === "O");

      if (isRowXWinning) {
        gameWon("X", `Row: ${i}`);
      }

      if (isRowOWinning) {
        gameWon("O", `Row: ${i}`);
      }
    }

    // Check columns
    for (let i = 0; i < 3; i += 1) {
      let isColumnXWinner = true;
      let isColumnOWinner = true;
      for (let j = 0; j < 3; j += 1) {
        if (map[j][i] !== "X") {
          isColumnXWinner = false;
        }

        if (map[j][i] !== "O") {
          isColumnOWinner = false;
        }
      }

      if (isColumnXWinner) {
        gameWon("X", `Column: ${i}`);
        break;
      }

      if (isColumnOWinner) {
        gameWon("O", `Column: ${i}`);
        break;
      }
    }

    // Check diagonals
    let isDiagonalMainXWinning = true;
    let isDiagonalMainOWinning = true;
    let isDiagonalMinorXWinning = true;
    let isDiagonalMinorOWinning = true;
    for (let i = 0; i < 3; i += 1) {
      if (map[i][i] !== "X") {
        isDiagonalMainXWinning = false;
      }

      if (map[i][i] !== "O") {
        isDiagonalMainOWinning = false;
      }

      if (map[i][2 - i] !== "X") {
        isDiagonalMinorXWinning = false;
      }

      if (map[i][2 - i] !== "O") {
        isDiagonalMinorOWinning = false;
      }
    }
    if (isDiagonalMainXWinning) {
      gameWon("X", "Main diagonal");
    }
    if (isDiagonalMainOWinning) {
      gameWon("O", "Main diagonal");
    }

    if (isDiagonalMinorXWinning) {
      gameWon("X", "Minor diagonal");
    }
    if (isDiagonalMinorOWinning) {
      gameWon("O", "Minor diagonal");
    }
  };

  const gameWon = (player, position) => {
    Alert.alert("Huraay!", `${player} won. ${position}`, [
      { text: "Restart", onPress: resetGame },
    ]);
  };

  const checkTieState = () => {
    if (!map.some((row) => row.some((cell) => cell === ""))) {
      Alert.alert("It's a tie!", 'tie', [
        { text: "Restart", onPress: resetGame },
      ]);

    }
  };

  const resetGame = () => {
    setMap(emptyMap);
    setCurrentTurn("X");
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={bg} style={styles.bg} resizeMode="contain">
        <View style={styles.map}>
          {map.map((row, rowIndex) => (
            <View key={`row-${rowIndex}`} style={styles.row}>
              {row.map((cell, columnIndex) => (
                <Pressable
                  key={`row-${rowIndex}--col${columnIndex}`}
                  onPress={() => onPress(rowIndex, columnIndex)}
                  style={styles.cell}
                >
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
  cross: { width: "100%", height: "100%" },
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
