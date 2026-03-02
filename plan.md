# Ridr - Technical Plan

## Architecture

```
ridr/
├── app/                    # Expo Router screens
│   ├── (tabs)/
│   │   ├── index.tsx       # Home / call settings
│   │   └── settings.tsx
│   └── _layout.tsx
├── components/
├── services/               # Call detection, TTS, contacts
├── hooks/
├── constants/
├── plugins/                # Expo config plugins
│   └── withCallDetection.js
```

## Android Call Flow

1. **BroadcastReceiver** (`CallDetectionReceiver`) listens for `PHONE_STATE` → `RINGING`
2. Extracts phone number from intent
3. Sends deep link `ridr://incoming?number=...` to open app
4. **JS** receives link via `Linking`, calls `announceIncomingCall(number)`
5. **contacts.ts** looks up display name from expo-contacts
6. **expo-speech** speaks: "{name} is calling. Say answer or decline."
7. User responds (future: voice or on-screen buttons for answer/decline)

## iOS

- Home screen shows card with path to Settings → Phone → Announce Calls
- No native call interception

## Dependencies

- expo, expo-router, expo-speech, expo-contacts, expo-dev-client
- @react-native-async-storage/async-storage
- react-native, react-native-screens, react-native-safe-area-context

## Build

- **Expo Go**: Basic UI only; call detection requires dev build
- **Development build**: `npx expo prebuild` then `npx expo run:android`
