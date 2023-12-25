import { StyleSheet, Dimensions, ImageBackground } from "react-native";

export default function Card({ name }) {
  return (
    <ImageBackground
      resizeMode="cover"
      source={{
        uri: `https://places.googleapis.com/v1/${name}/media?key=${process.env.EXPO_PUBLIC_PLACES_API_KEY}&maxHeightPx=400`,
      }}
      style={{ ...styles.container }}
    ></ImageBackground>
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
