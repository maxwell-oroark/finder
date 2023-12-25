import { useEffect, useState } from "react";
import { View, FlatList, Dimensions } from "react-native";
import Card from "./Card";

export default function App() {
  const [data, setData] = useState();
  useEffect(() => {
    const PLACES_URL = "https://places.googleapis.com/v1/places:searchNearby";
    const options = {
      method: "POST",
      body: JSON.stringify({
        locationRestriction: {
          circle: {
            center: {
              latitude: 37.7937,
              longitude: -122.3965,
            },
            radius: 500.0,
          },
        },
      }),
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": process.env.EXPO_PUBLIC_PLACES_API_KEY,
      },
    };
    fetch(PLACES_URL, options)
      .then((response) => response.json())
      .then(setData);
  }, []);

  console.log({ data });

  const [restuarants, setRestuarants] = useState([
    {
      name: "Guidos",
      photos: [
        { name: "item 1", color: "red" },
        { name: "item 2", color: "#FFEFD5" },
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
    {
      name: "Barbaros",
      photos: [
        { name: "item 7", color: "silver" },
        { name: "item 8", color: "plum" },
        { name: "item 9", color: "orange" },
      ],
    },
  ]);

  return (
    <View>
      <FlatList
        data={restuarants}
        renderItem={({ item }) => {
          return (
            <FlatList
              initialScrollIndex={1}
              getItemLayout={(data, index) => ({
                length: Dimensions.get("window").width,
                offset: Dimensions.get("window").width * index,
                index,
              })}
              data={item.photos}
              horizontal
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
              snapToInterval={Dimensions.get("window").width}
            />
          );
        }}
        initialScrollIndex={1}
        getItemLayout={(data, index) => ({
          length: Dimensions.get("window").height,
          offset: Dimensions.get("window").height * index,
          index,
        })}
        keyExtractor={(item) => item.name}
        snapToAlignment="start"
        decelerationRate="fast"
        snapToInterval={Dimensions.get("window").height}
      />
    </View>
  );
}
