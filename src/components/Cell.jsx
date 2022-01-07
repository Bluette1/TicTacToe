import { View, StyleSheet, Pressable } from "react-native";
import Cross from "./Cross";

const Cell = ({ cell, onPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.cell}>
      {cell === "O" && <View style={styles.circle}></View>}
      {cell === "X" && <Cross />}
    </Pressable>
  );
};

styles = StyleSheet.create({
  cell: {
    flex: 1,
    borderWidth: 1,
    borderColor: "white",
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
});

export default Cell;
