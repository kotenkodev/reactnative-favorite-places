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
import { useEffect, useState, useCallback, useRef } from "react";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { getAddress, getMapPreview } from "../util/location";

const LocationPicker = ({
  onLocationPicked,
}: {
  onLocationPicked: (location: {
    lat: number;
    lng: number;
    address: string;
  }) => void;
}) => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const isFocused = useIsFocused();
  const [isFetching, setIsFetching] = useState(false);
  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();
  const [pickedLocation, setPickedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [pickedAddress, setPickedAddress] = useState<string | null>(null);

  const lastCoordsRef = useRef<{ lat: number; lng: number } | null>(null);

  const resolveLocationAndAddress = useCallback(
    async (lat: number, lng: number) => {
      setIsFetching(true);
      setPickedLocation({ lat, lng });
      try {
        const address = await getAddress(lat, lng);
        setPickedAddress(address);
        onLocationPicked({ lat, lng, address });
      } catch (error) {
        console.warn("Failed to resolve address:", error);
        const fallbackAddress = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
        setPickedAddress(fallbackAddress);
        onLocationPicked({ lat, lng, address: fallbackAddress });
      } finally {
        setIsFetching(false);
      }
    },
    [onLocationPicked],
  );

  useEffect(() => {
    if (
      isFocused &&
      route.params &&
      typeof route.params.pickedLat === "number" &&
      typeof route.params.pickedLng === "number"
    ) {
      const lat = route.params.pickedLat;
      const lng = route.params.pickedLng;

      if (
        !lastCoordsRef.current ||
        lastCoordsRef.current.lat !== lat ||
        lastCoordsRef.current.lng !== lng
      ) {
        lastCoordsRef.current = { lat, lng };
        resolveLocationAndAddress(lat, lng);
      }
    }
  }, [route.params, isFocused, resolveLocationAndAddress]);

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
    if (isFetching) {
      return;
    }

    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    setIsFetching(true);
    try {
      const location = await getCurrentPositionAsync();
      const lat = location.coords.latitude;
      const lng = location.coords.longitude;
      lastCoordsRef.current = { lat, lng };
      setPickedLocation({ lat, lng });

      const address = await getAddress(lat, lng);
      setPickedAddress(address);
      onLocationPicked({ lat, lng, address });
    } catch (error) {
      Alert.alert(
        "Could not fetch location!",
        "Please try again later or pick a location on the map.",
      );
    } finally {
      setIsFetching(false);
    }
  };

  const pickOnMapHandler = () => {
    if (isFetching) {
      return;
    }
    navigation.navigate("Map");
  };

  let locationPreview = (
    <Text style={styles.fallbackText}>No location picked yet.</Text>
  );

  if (isFetching) {
    locationPreview = (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary500} />
        <Text style={styles.loadingText}>Fetching location & address...</Text>
      </View>
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
    <View style={styles.container}>
      <View style={styles.mapPreview}>{locationPreview}</View>
      {pickedAddress && !isFetching && (
        <View style={styles.addressContainer}>
          <Text style={styles.addressLabel}>Address:</Text>
          <Text style={styles.addressText} numberOfLines={3}>
            {pickedAddress}
          </Text>
        </View>
      )}
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
  container: {
    marginVertical: 8,
  },
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
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  loadingText: {
    color: Colors.primary500,
    fontSize: 14,
  },
  fallbackText: {
    color: Colors.primary700,
  },
  addressContainer: {
    backgroundColor: Colors.primary100,
    padding: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  addressLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: Colors.primary500,
    marginBottom: 2,
  },
  addressText: {
    fontSize: 14,
    color: Colors.gray700,
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
