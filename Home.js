import { Dimensions, FlatList, View, Text } from "react-native";
import { useQuery } from "react-query";
import Card from "./Card";

const MAX_RESULTS = 20;

function fetchPlaces(location) {
  console.log("are you activating");
  const PLACES_URL = "https://places.googleapis.com/v1/places:searchNearby";
  const options = {
    method: "POST",
    body: JSON.stringify({
      rankPreference: "POPULARITY",
      includedTypes: ["restaurant"],
      maxResultCount: MAX_RESULTS,
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
  return fetch(PLACES_URL, options)
    .then((response) => response.json())
    .catch((err) => {
      console.log({ err });
    });
}

export default function Home({ places, location }) {
  const { data, status, refetch } = useQuery(["places", location], () =>
    fetchPlaces(location)
  );

  console.log({ data });

  if (!data) {
    return (
      <View>
        <Text>No data</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={data.places}
      initialScrollIndex={Math.floor(data.places.length / 2)}
      getItemLayout={(data, index) => {
        return {
          length: Dimensions.get("window").height,
          offset: Dimensions.get("window").height * index,
          index,
        };
      }}
      renderItem={({ item: parentItem }) => {
        return (
          <FlatList
            initialScrollIndex={Math.floor(parentItem.photos.length / 2)}
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
      keyExtractor={(item) => item.id}
      snapToAlignment="start"
      decelerationRate="fast"
      snapToInterval={Dimensions.get("window").height}
    />
  );
}
