import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import useLocation from "./hooks/useLocation";

export default function App() {
  const location = useLocation({});

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text>{location.latitude}</Text>
      <Text>{location.longitude}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
