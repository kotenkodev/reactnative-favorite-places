import { StyleSheet, View } from "react-native";
import PlacesList from "../components/PlacesList";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Place } from "../models/place";
import { fetchPlaces } from "../util/database";

export default function AllPlaces() {
  const navigation = useNavigation<any>();
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

  const selectPlaceHandler = (id: string) => {
    navigation.navigate("PlaceDetails", { placeId: id });
  };

  return (
    <View style={styles.container}>
      <PlacesList places={loadedPlaces} onSelectPlace={selectPlaceHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
