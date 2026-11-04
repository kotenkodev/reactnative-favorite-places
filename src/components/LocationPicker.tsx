import {
  View,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Image,
} from "react-native";
import OutlinedButton from "./ui/OutlinedButton";
import { Colors } from "../constants/colors";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { getMapPreview } from "../util/location";

const LocationPicker = () => {
  const navigation = useNavigation<any>();
  const [isFetching, setIsFetching] = useState(false);
  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();
  const [pickedLocation, setPickedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const verifyPermissions = async () => {
    if (
      locationPermissionInformation?.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (locationPermissionInformation?.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant location permissions to use this app.",
      );
      return false;
    }

    return true;
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    setIsFetching(true);
    try {
      const location = await getCurrentPositionAsync();
      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    } catch (error) {
      Alert.alert(
        "Could not fetch location!",
        "Please try again later or pick a location on the map.",
      );
    }
    setIsFetching(false);
  };

  const pickOnMapHandler = () => {
    navigation.navigate("Map");
  };

  let locationPreview = <Text>No location picked yet.</Text>;

  if (isFetching) {
    locationPreview = (
      <ActivityIndicator size="large" color={Colors.primary500} />
    );
  } else if (pickedLocation) {
    locationPreview = (
      <Image
        style={styles.image}
        source={{
          uri: getMapPreview(pickedLocation.lat, pickedLocation.lng),
        }}
      />
    );
  }

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
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
    overflow: "hidden",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
