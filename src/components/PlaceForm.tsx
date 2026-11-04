import { useCallback, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import { Colors } from "../constants/colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "./ui/Button";
import { Place } from "../models/place";

const PlaceForm = ({
  onSavePlace,
}: {
  onSavePlace: (place: Place) => void;
}) => {
  const [title, setTitle] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [pickedLocation, setPickedLocation] = useState<{
    lat: number;
    lng: number;
    address: string;
  } | null>(null);

  const changeTitleHandler = (enteredText: string) => {
    setTitle(enteredText);
  };

  const savePlaceHandler = () => {
    if (!title || !selectedImage || !pickedLocation) {
      Alert.alert(
        "Incomplete Data",
        "Please provide a title, image, and location before saving.",
      );
      return;
    }

    const { address, ...location } = pickedLocation;

    const newPlace = new Place(title, selectedImage, address, location);

    onSavePlace(newPlace);
  };

  const imageTakenHandler = (imageUri: string) => {
    setSelectedImage(imageUri);
  };

  const locationPickedHandler = useCallback(
    (location: { lat: number; lng: number; address: string }) => {
      setPickedLocation(location);
    },
    [],
  );

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={changeTitleHandler}
          placeholder="Enter title"
          value={title}
        />
      </View>

      <ImagePicker
        onImageTaken={imageTakenHandler}
        selectedImage={selectedImage}
      />
      <LocationPicker onLocationPicked={locationPickedHandler} />
      <Button onPress={savePlaceHandler}>Add Place</Button>
    </ScrollView>
  );
};

export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: { fontWeight: "bold", marginBottom: 4, color: Colors.primary500 },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
});
