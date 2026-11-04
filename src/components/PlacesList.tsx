import { FlatList, StyleSheet, Text, View } from "react-native";
import { Place } from "../models/place";
import PlaceItem from "./PlaceItem";

interface PlacesListProps {
  places: Place[];
}

export default function PlacesList({ places }: PlacesListProps) {
  if (places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No places found. Start adding some!
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <PlaceItem place={item} />}
    />
  );
}

const styles = StyleSheet.create({
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 16,
    color: "#888",
  },
});
