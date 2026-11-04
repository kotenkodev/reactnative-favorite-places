import { StyleSheet, View } from "react-native";
import PlaceForm from "../components/PlaceForm";

export default function AddPlace() {
  const handleSavePlace = (placeData: {
    title: string;
    imageUri: string;
    location: { lat: number; lng: number; address: string };
  }) => {
    console.log("Place Data:", placeData);
  };

  return <PlaceForm onSavePlace={handleSavePlace} />;
}

const styles = StyleSheet.create({});
