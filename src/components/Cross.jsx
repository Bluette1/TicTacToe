import { View, StyleSheet } from "react-native";

const Cross = () => {
  return (
    <View style={styles.cross}>
      <View style={styles.crossLine}></View>
      <View style={[styles.crossLine, styles.crossLineReversed]}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  cross: { width: "100%", height: "100%" },
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
export default Cross;
