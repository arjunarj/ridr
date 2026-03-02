# Ridr - Project Progress

## Overview

Ridr is a rider-focused mobile app that announces incoming caller names via TTS for motorcyclists/cyclists using Bluetooth headsets.

## Tech Stack

- **Framework**: Expo 55 (React Native)
- **Navigation**: Expo Router (tabs)
- **State**: AsyncStorage for persistence
- **Audio**: expo-speech (TTS)
- **Contacts**: expo-contacts
- **Platform**: Android (full), iOS (informational only)

## Project Structure

```
ridr/
├── app/                    # Expo Router pages
│   ├── (tabs)/            # Tab navigation
│   │   ├── index.tsx      # Home screen (call announcement toggle)
│   │   └── settings.tsx  # Settings screen
│   └── _layout.tsx       # Root layout
├── components/            # UI components
│   └── CallAnnouncementCard.tsx
├── hooks/                 # Custom hooks
│   ├── useCallAnnouncement.ts
│   └── useIncomingCallLink.ts
├── services/              # Business logic
│   ├── callAnnouncement.ts
│   ├── contacts.ts
│   └── permissions.ts
├── constants/
│   └── Colors.ts
├── plugins/               # Expo config plugins
│   └── withCallDetection.js
└── app.json              # Expo config
```

## Completed Features

- [x] Scaffold Expo project with tabs
- [x] Add Spec Kit documents (constitution, spec, plan)
- [x] Create app structure (app/, components/, services/, hooks/, constants/)
- [x] Implement CallAnnouncementCard and useCallAnnouncement hook
- [x] Implement contacts lookup (expo-contacts)
- [x] Implement TTS announcement (expo-speech)
- [x] Add Expo config plugin for Android BroadcastReceiver
- [x] Wire deep link (ridr://incoming) to TTS
- [x] Add iOS informational card
- [x] Request permissions with rationale (phone, contacts)
- [x] Dark theme UI
- [x] PR created: https://github.com/arjunarj/ridr/pull/1

## Remaining Tasks

- [ ] Add answer/decline UI or voice handling (Android Telecom API)
- [ ] Test on physical Android device with Bluetooth headset
- [ ] Add settings for TTS voice, rate, language

## How to Run

```bash
# Install dependencies
npm install

# Run on Android
npx expo run:android

# Run on iOS
npx expo run:ios

# Build Android APK (standalone)
npx expo run:android --variant release
```

## Key Implementation Details

### Android Call Detection

The app uses a BroadcastReceiver (`CallDetectionReceiver.java`) to detect incoming calls:
- Registered via Expo config plugin (`plugins/withCallDetection.js`)
- Listens for `android.intent.action.PHONE_STATE`
- Opens deep link `ridr://incoming?number=...` when ringing

### Deep Link Handling

- Scheme: `ridr://`
- Incoming call: `ridr://incoming?number=+1234567890`
- Handled by `useIncomingCallLink` hook

### Permissions (Android)

- `READ_PHONE_STATE` - Detect call state
- `READ_CONTACTS` - Lookup caller name
- `ANSWER_PHONE_CALLS` - Answer calls (future)
- `MODIFY_AUDIO_SETTINGS` - Audio routing

## Commands for Development

```bash
# Prebuild Android (generate native code)
npx expo prebuild --platform android

# Run Android with bundled JS
npx expo run:android --variant release

# Clear cache
npx expo start --clear
```

## Notes

- iOS uses built-in "Announce Calls" feature (Settings → Phone → Announce Calls → Headphones Only)
- Android Telecom API required for actual call answer/decline (requires system permissions)
- TTS uses expo-speech with default Android TTS engine
