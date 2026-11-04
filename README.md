# Favorite Places 📍

A React Native mobile application built with Expo (SDK 58) and TypeScript that allows users to capture, locate, and store their favorite places with offline SQLite database persistence.

---

## Features

- 📸 **Camera Integration**: Capture photos directly from your device using `expo-image-picker` with permission handling and instant image previews.
- 🌍 **GPS Location**: Locate your current device coordinates using `expo-location`.
- 🗺️ **Interactive & Read-Only Maps**: 
  - Pick a coordinate on an interactive map (`react-native-maps` powered by open CartoDB OpenStreetMap raster tiles).
  - Open a saved place in read-only map mode with a dedicated marker pin.
- 🏡 **Reverse Geocoding**: Automatically converts GPS latitude and longitude into human-readable street addresses via OpenStreetMap Nominatim.
- 💾 **Local SQLite Persistence**: Uses modern `expo-sqlite` API (`openDatabaseSync`, `execAsync`, `runAsync`, `getAllAsync`, `getFirstAsync`) to persist place records locally.
- 🚀 **App Loading & Splash Screen**: Seamless startup experience using `expo-splash-screen` while SQLite tables initialize.
- 🧭 **Navigation**: Stack navigation using `@react-navigation/native` and `@react-navigation/native-stack` (v7) with custom headers and responsive back navigation.

---

## Tech Stack

| Technology | Description |
| --- | --- |
| **React Native** | Core cross-platform mobile framework (0.88) |
| **Expo SDK 58** | Modern developer toolchain & runtime |
| **TypeScript** | Strict type safety throughout the codebase |
| **React Navigation 7** | Native stack navigation |
| **expo-sqlite** | Local SQLite database storage |
| **expo-location** | GPS and foreground permissions |
| **expo-image-picker** | Native device camera access |
| **expo-splash-screen** | Native splash screen control |
| **react-native-maps** | Native map rendering with tile support |
| **Ionicons** | Vector icons for intuitive UI actions |

---

## Project Structure

```text
├── assets/                  # App icons and splash assets
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/              # Buttons (IconButton, OutlinedButton, Button)
│   │   ├── ImagePicker.tsx  # Camera capture and photo preview
│   │   ├── LocationPicker.tsx # GPS fetch, map preview, and address lookup
│   │   ├── PlaceForm.tsx    # Form handling inputs, image, and location
│   │   ├── PlaceItem.tsx    # List item card with image and address
│   │   └── PlacesList.tsx   # FlatList container with empty state
│   ├── constants/           # Color constants and theme palette
│   ├── models/              # TypeScript class definitions (Place)
│   ├── screens/             # Screen routes
│   │   ├── AddPlace.tsx     # Screen for creating and inserting places
│   │   ├── AllPlaces.tsx    # List of all saved places from SQLite
│   │   ├── Map.tsx          # Interactive picking and read-only map view
│   │   └── PlaceDetails.tsx # Detailed view of a saved place
│   └── util/                # Database & Location utilities
│       ├── database.ts      # SQLite init, insertPlace, fetchPlaces, fetchPlaceDetails
│       └── location.ts      # Map tile preview and Nominatim reverse geocode
├── App.tsx                  # Root app component and stack navigator
└── index.ts                 # Expo entry point
```

---

## Getting Started

### Prerequisites

- Node.js (>= 18)
- npm or bun
- Expo Go app on your physical device or an Android/iOS emulator/development build

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repo-url>
   cd react-native-notifications
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npx expo start
   ```

4. **Run on your device**:
   - Press `a` in the terminal to launch the Android emulator, or scan the QR code using Expo Go or a custom development build (`expo run:android`).

---

## Verification & Quality Checks

Run lint and typecheck at any time:

```bash
# TypeScript check
npx tsc --noEmit

# Diagnose Expo configuration and dependencies
npx expo-doctor
```
