import { FlatList, StyleSheet, Text, View } from "react-native";
import { Place } from "../models/place";
import PlaceItem from "./PlaceItem";
import { Colors } from "../constants/colors";

interface PlacesListProps {
  places: Place[];
  onSelectPlace?: (id: string) => void;
}

export default function PlacesList({ places, onSelectPlace }: PlacesListProps) {
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
      style={styles.list}
      contentContainerStyle={styles.listContent}
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <PlaceItem place={item} onSelect={onSelectPlace} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    margin: 24,
  },
  listContent: {
    paddingBottom: 24,
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 16,
    color: Colors.primary200,
  },
});
