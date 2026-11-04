// CartoDB OpenStreetMap tile generator - 100% free, NO API key required, NO credit card, NO blocking
export function getMapPreview(lat: number, lng: number) {
  const zoom = 14;
  const n = 2 ** zoom;
  const x = Math.floor(((lng + 180) / 360) * n);
  const latRad = (lat * Math.PI) / 180;
  const y = Math.floor(((1 - Math.asinh(Math.tan(latRad)) / Math.PI) / 2) * n);

  // OpenStreetMap tile via CartoDB mirror (tile.openstreetmap.org blocks requests with 403 / Access Denied)
  return `https://a.basemaps.cartocdn.com/rastertiles/voyager/${zoom}/${x}/${y}.png`;
}
