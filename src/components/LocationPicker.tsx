import { View, Text, StyleSheet } from "react-native";
import OutlinedButton from "./ui/OutlinedButton";
import { Colors } from "../constants/colors";

const LocationPicker = () => {
  const getLocationHandler = () => {
    console.log("Getting location...");
  };

  const pickOnMapHandler = () => {
    console.log("Picking on map...");
  };

  return (
    <View>
      <View style={styles.mapPreview}></View>
      <View style={styles.actions}>
        <OutlinedButton name="location" onPress={getLocationHandler}>
          Locate User
        </OutlinedButton>

        <OutlinedButton name="map" onPress={pickOnMapHandler}>
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    marginVertical: 8,
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
