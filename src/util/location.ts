import * as Location from "expo-location";

export function getMapPreview(lat: number, lng: number) {
  const zoom = 14;
  const n = 2 ** zoom;
  const x = Math.floor(((lng + 180) / 360) * n);
  const latRad = (lat * Math.PI) / 180;
  const y = Math.floor(((1 - Math.asinh(Math.tan(latRad)) / Math.PI) / 2) * n);

  return `https://a.tile.opentopomap.org/${zoom}/${x}/${y}.png`;
}

export async function getAddress(lat: number, lng: number): Promise<string> {
  try {
    const reverseGeocoded = await Location.reverseGeocodeAsync({
      latitude: lat,
      longitude: lng,
    });

    if (reverseGeocoded && reverseGeocoded.length > 0) {
      const item = reverseGeocoded[0];
      const addressLine = [
        item.streetNumber ? `${item.streetNumber} ` : "",
        item.street || item.name || "",
        item.city || item.subregion || "",
        item.region || "",
        item.country || "",
      ]
        .map((p) => p.trim())
        .filter((p) => p.length > 0);

      const uniqueParts = [...new Set(addressLine)];
      if (uniqueParts.length > 0) {
        return uniqueParts.join(", ");
      }
    }
  } catch (nativeError) {
    console.warn(
      "Native reverseGeocodeAsync failed, trying fallback:",
      nativeError,
    );
  }

  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;
    const response = await fetch(url, {
      headers: {
        "User-Agent": "ReactNativePlacesApp/1.0",
        "Accept-Language": "en-US,en;q=0.9",
      },
    });

    if (response.ok) {
      const data = await response.json();
      if (data && data.display_name) {
        return data.display_name;
      }
    }
  } catch (nominatimError) {
    console.warn("Nominatim reverse geocode failed:", nominatimError);
  }

  return `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
}
