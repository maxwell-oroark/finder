import { StyleSheet, Dimensions, Text, View } from "react-native";

export default function Card({ name, color = "#3B5323" }) {
  return (
    <View style={{ ...styles.container, backgroundColor: color }}>
      <Text style={styles.title}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#000",
    borderWidth: 2,
    alignSelf: "center",
  },
  title: {
    color: "#fff",
    fontSize: 20,
  },
});
