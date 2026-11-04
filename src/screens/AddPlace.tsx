import PlaceForm from "../components/PlaceForm";
import { Place } from "../models/place";
import { insertPlace } from "../util/database";

export default function AddPlace({ navigation }: { navigation: any }) {
  const handleSavePlace = async (placeData: Place) => {
    await insertPlace(placeData);
    navigation.navigate("AllPlaces");
  };

  return <PlaceForm onSavePlace={handleSavePlace} />;
}
