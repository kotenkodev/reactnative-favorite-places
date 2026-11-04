import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Place } from "../models/place";

interface PlaceItemProps {
  place: Place;
}

export default function PlaceItem({
  place: { id, title, imageUri, address, location },
}: PlaceItemProps) {
  return (
    <Pressable onPress={() => console.log("Pressed place with id:", id)}>
      <Image source={{ uri: imageUri }} style={{ width: 100, height: 100 }} />
      <View>
        <Text>{title}</Text>
        <Text>{address}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({});
