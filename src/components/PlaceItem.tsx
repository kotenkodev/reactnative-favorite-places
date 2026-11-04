import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Place } from "../models/place";
import { Colors } from "../constants/colors";

interface PlaceItemProps {
  place: Place;
  onSelect?: (id: string) => void;
}

export default function PlaceItem({
  place: { id, title, imageUri, address },
  onSelect,
}: PlaceItemProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.item, pressed && styles.pressed]}
      onPress={() => onSelect?.(id)}
    >
      <Image source={{ uri: imageUri }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.address}>{address}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 6,
    marginVertical: 8,
    backgroundColor: Colors.primary500,
    elevation: 2,
    shadowColor: "black",
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
    overflow: "hidden",
  },
  pressed: {
    opacity: 0.85,
  },
  image: {
    flex: 1,
    height: 100,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
  },
  info: {
    flex: 2,
    padding: 12,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: Colors.gray700,
    marginBottom: 4,
  },
  address: {
    fontSize: 12,
    color: Colors.gray700,
  },
});
