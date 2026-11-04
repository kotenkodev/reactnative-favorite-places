import * as SQLite from "expo-sqlite";
import { Place } from "../models/place";

const database = SQLite.openDatabaseSync("places.db");

export function init() {
  return database.execAsync(`
    CREATE TABLE IF NOT EXISTS places (
      id INTEGER PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      imageUri TEXT NOT NULL,
      address TEXT NOT NULL,
      lat REAL NOT NULL,
      lng REAL NOT NULL
    );
  `);
}

export function insertPlace(place: Place) {
  return database.runAsync(
    `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
    [
      place.title,
      place.imageUri,
      place.address,
      place.location.lat,
      place.location.lng,
    ],
  );
}

export async function fetchPlaces(): Promise<Place[]> {
  const result = await database.getAllAsync<{
    id: number;
    title: string;
    imageUri: string;
    address: string;
    lat: number;
    lng: number;
  }>("SELECT * FROM places");

  return result.map(
    (dp) =>
      new Place(
        dp.title,
        dp.imageUri,
        dp.address,
        { lat: dp.lat, lng: dp.lng },
        dp.id.toString(),
      ),
  );
}
