import { useEffect, useState } from "react";
import * as Location from "expo-location";

function useLocation(initialState) {
  const [location, setLocation] = useState(initialState);
  useEffect(() => {
    Location.requestForegroundPermissionsAsync().then((permission) => {
      if (permission.granted) {
        Location.getCurrentPositionAsync({}).then((location) => {
          setLocation(location.coords);
        });
      }
    });
  }, []);
  return location;
}

export default useLocation;
