export function getMapPreview(lat: number, lng: number) {
  const zoom = 14;
  const n = 2 ** zoom;
  const x = Math.floor(((lng + 180) / 360) * n);
  const latRad = (lat * Math.PI) / 180;
  const y = Math.floor(((1 - Math.asinh(Math.tan(latRad)) / Math.PI) / 2) * n);

  return `https://a.tile.opentopomap.org/${zoom}/${x}/${y}.png`;
}

export async function getAddress(lat: number, lng: number) {
  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "ReactNativeExpenseTracker/1.0",
        "Accept-Language": "en-US,en;q=0.9",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Nominatim API Error:", response.status, errorText);
      throw new Error(`Failed to fetch address. Status: ${response.status}`);
    }

    const data = await response.json();
    return data.display_name;
  } catch (error) {
    console.error("Geocoding Exception:", error);
    throw error;
  }
}
