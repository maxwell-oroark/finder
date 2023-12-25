import { useEffect, useState } from "react";
import { View, Text, FlatList, Dimensions } from "react-native";
import Card from "./Card";
import useLocation from "./hooks/useLocation";

export default function App() {
  const [data, setData] = useState({});
  const location = useLocation();
  console.log({ location });
  useEffect(() => {
    if (location) {
      const PLACES_URL = "https://places.googleapis.com/v1/places:searchNearby";
      const options = {
        method: "POST",
        body: JSON.stringify({
          rankPreference: "POPULARITY",
          includedTypes: ["restaurant"],
          maxResultCount: 5,
          locationRestriction: {
            circle: {
              center: location,
              radius: 500.0,
            },
          },
        }),
        headers: {
          "Content-Type": "application/json",
          "X-Goog-FieldMask": "places.photos,places.displayName,places.id",
          "X-Goog-Api-Key": process.env.EXPO_PUBLIC_PLACES_API_KEY,
        },
      };
      fetch(PLACES_URL, options)
        .then((response) => response.json())
        .then(setData)
        .catch((err) => {
          console.log({ err });
        });
    }
  }, [location]);

  if (!data.places) {
    return (
      <View>
        <Text>No places</Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={data.places}
        renderItem={({ item: parentItem }) => {
          return (
            <FlatList
              initialScrollIndex={1}
              getItemLayout={(data, index) => ({
                length: Dimensions.get("window").width,
                offset: Dimensions.get("window").width * index,
                index,
              })}
              data={parentItem.photos}
              horizontal
              renderItem={({ item }) => {
                return <Card name={item.name} />;
              }}
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
        keyExtractor={(item) => item.id}
        snapToAlignment="start"
        decelerationRate="fast"
        snapToInterval={Dimensions.get("window").height}
      />
    </View>
  );
}
