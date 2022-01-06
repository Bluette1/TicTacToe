import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  ImageBackground,
  Pressable,
  Alert,
  Text,
} from "react-native";
import bg from "./assets/bg.jpeg";
import Cell from "./src/components/Cell";

export default function App() {
  const emptyMap = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  const [map, setMap] = useState(emptyMap);

  const [currentTurn, setCurrentTurn] = useState("X");
  
  useEffect(()=>{
    if (currentTurn == 'O') {
      botTurn();
    }
  }, [currentTurn]);

  const onPress = (rowIndex, columnIndex) => {
    if (map[rowIndex][columnIndex] !== "") {
      Alert.alert("Position already occupied");
      return;
    }

    setMap((existingMap) => {
      const updatedMap = [...existingMap];
      updatedMap[rowIndex][columnIndex] = currentTurn.toUpperCase();
      return updatedMap;
    });

    setCurrentTurn(currentTurn === "X" ? "O" : "X");
    const winner = getWinner();
    if (winner) {
      gameWon(winner[0], winner[1]);
    } else {
      checkTieState();
    }
  };

  const getWinner = () => {
    // Check rows
    for (let i = 0; i < 3; i += 1) {
      const isRowXWinning = map[i].every((cell) => cell === "X");
      const isRowOWinning = map[i].every((cell) => cell === "O");

      if (isRowXWinning) {
        return ["X", `Row: ${i}`];
      }

      if (isRowOWinning) {
        return ["O", `Row: ${i}`];
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
        return ["X", `Column: ${i}`];
      }

      if (isColumnOWinner) {
        return ["O", `Column: ${i}`];
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
      return ["X", "Main diagonal"];
    }
    if (isDiagonalMainOWinning) {
      return ["O", "Main diagonal"];
    }

    if (isDiagonalMinorXWinning) {
      return ["X", "Minor diagonal"];
    }

    if (isDiagonalMinorOWinning) {
      return ["O", "Minor diagonal"];
    }
  };

  const gameWon = (player, position) => {
    Alert.alert("Huraay!", `${player} won. ${position}`, [
      { text: "Restart", onPress: resetGame },
    ]);
  };

  const checkTieState = () => {
    if (!map.some((row) => row.some((cell) => cell === ""))) {
      Alert.alert("It's a tie!", "tie", [
        { text: "Restart", onPress: resetGame },
      ]);
    }
  };

  const resetGame = () => {
    setMap(emptyMap);
    setCurrentTurn("X");
  };

  const botTurn = () => {
    // Collect all possible options
    const possibleOptions = [];
    map.forEach((row, rowIndex) => row.forEach((cell, columnIndex)=> {
      if (cell === '') {
        possibleOptions.push({row: rowIndex, col: columnIndex});
      }
    }));

    // Choose the best option
    const chosenOption = possibleOptions[Math.floor(Math.random() * possibleOptions.length)];
    onPress(chosenOption.row, chosenOption.col);
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={bg} style={styles.bg} resizeMode="contain">
        <Text style={styles.currentTurn}>Current turn: {currentTurn}</Text>
        <View style={styles.map}>
          {map.map((row, rowIndex) => (
            <View key={`row-${rowIndex}`} style={styles.row}>
              {row.map((cell, columnIndex) => (
                <Cell key={`row-${rowIndex}--col${columnIndex}`} cell={cell} onPress={() => onPress(rowIndex, columnIndex)} columnIndex={columnIndex} rowIndex={rowIndex} />
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
  currentTurn: {
    fontSize: 24,
    color: "white",
    position: "absolute",
    top: 50,
  },
});
