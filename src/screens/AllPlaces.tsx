import { StyleSheet, View } from "react-native";
import PlacesList from "../components/PlacesList";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Place } from "../models/place";

export default function AllPlaces({ route }: { route: any }) {
  const isFocused = useIsFocused();
  const [loadedPlaces, setLoadedPlaces] = useState<Place[]>([]);

  useEffect(() => {
    if (isFocused && route.params) {
      setLoadedPlaces((currentPlaces) => [
        ...currentPlaces,
        route.params.place,
      ]);
    }
  }, [isFocused, route]);

  return <PlacesList places={loadedPlaces} />;
}

const styles = StyleSheet.create({});
