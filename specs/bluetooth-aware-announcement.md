# Feature Specification: Bluetooth-Aware Call Announcement

## 1. Problem Statement

Currently, Ridr announces incoming calls via TTS whenever enabled, regardless of whether the user is wearing a Bluetooth headset. This is wasteful and annoying when the phone is not connected to an audio device.

## 2. User Story

As a rider, I want the app to only announce incoming calls when my Bluetooth headset is connected, so that I only hear announcements when I'm actually using my headset.

## 3. Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| R1 | Add toggle to enable/disable "Bluetooth-only" mode | Must |
| R2 | Detect Bluetooth audio device connection state | Must |
| R3 | Only announce calls when Bluetooth is connected (if mode enabled) | Must |
| R4 | Persist the Bluetooth-only preference | Must |
| R5 | Show current Bluetooth connection status in UI | Should |

## 4. Acceptance Criteria

- [ ] User can enable "announce only with Bluetooth" toggle
- [ ] When enabled, calls are NOT announced if no Bluetooth audio device is connected
- [ ] When Bluetooth connects, subsequent calls ARE announced
- [ ] When Bluetooth disconnects, announcement stops (if mid-call)
- [ ] Setting persists across app restarts
- [ ] UI shows Bluetooth connection status

## 5. Technical Approach

### Libraries
- Use `expo-modules-core` for native Bluetooth state (or Android native API)
- Alternative: Use `react-native BluetoothState` or similar

### Data Flow
1. User toggles "Bluetooth-only" mode → saved to AsyncStorage
2. App listens to Bluetooth state changes
3. On incoming call: check both `enabled` AND (Bluetooth mode → connected status)
4. Only announce if conditions met

### Platform-Specific
- **Android**: Use `AudioManager` to detect SCO audio connection
- **iOS**: Not applicable (uses system Announce Calls)
