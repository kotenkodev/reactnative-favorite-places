import { StyleSheet, View } from "react-native";
import PlacesList from "../components/PlacesList";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Place } from "../models/place";
import { fetchPlaces } from "../util/database";

export default function AllPlaces() {
  const isFocused = useIsFocused();
  const [loadedPlaces, setLoadedPlaces] = useState<Place[]>([]);

  useEffect(() => {
    async function loadPlaces() {
      const places = await fetchPlaces();
      setLoadedPlaces(places);
    }

    if (isFocused) {
      loadPlaces();
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <PlacesList places={loadedPlaces} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
