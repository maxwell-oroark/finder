import { useState } from "react";
import { StyleSheet, View, FlatList, Dimensions } from "react-native";
import Card from "./Card";

export default function App() {
  const [restuarants, setRestuarants] = useState([
    {
      name: "Guidos",
      photos: [
        { name: "item 1", color: "red" },
        { name: "item 2", color: "white" },
        { name: "item 3", color: "blue" },
      ],
    },
    {
      name: "McDonalds",
      photos: [
        { name: "item 4", color: "green" },
        { name: "item 5", color: "purple" },
        { name: "item 6", color: "gold" },
      ],
    },
  ]);

  return (
    <View>
      <FlatList
        data={restuarants}
        horizontal
        renderItem={({ item }) => {
          return (
            <FlatList
              data={item.photos}
              renderItem={({ item }) => (
                <Card
                  name={item.name}
                  color={item.color}
                  key={`${item.name}-${item.color}`}
                />
              )}
              keyExtractor={(item) => item.name}
              snapToAlignment="start"
              decelerationRate="fast"
              snapToInterval={Dimensions.get("window").height}
            />
          );
        }}
        keyExtractor={(item) => item.name}
        snapToAlignment="start"
        decelerationRate="fast"
        snapToInterval={Dimensions.get("window").width}
      />
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
