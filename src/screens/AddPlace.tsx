import PlaceForm from "../components/PlaceForm";
import { Place } from "../models/place";

export default function AddPlace({ navigation }: { navigation: any }) {
  const handleSavePlace = (placeData: Place) => {
    navigation.navigate("AllPlaces", { place: placeData });
  };

  return <PlaceForm onSavePlace={handleSavePlace} />;
}
