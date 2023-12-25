import * as Location from "expo-location";

export const getLocation = async () => {
  const locationData = await Location.getCurrentPositionAsync({});
  console.log("Location:", locationData);
  return locationData.coords;
};

export const askForLocationPermission = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    console.warn("permission to access location was denied");
  }
  return status;
};
