# Implementation Plan: Bluetooth-Aware Call Announcement

## Technical Decisions

### Bluetooth Detection Approach
- Use Android's `AudioManager` to detect Bluetooth SCO (Synchronous Connection-Oriented) audio
- SCO is the audio path for Bluetooth headset calls
- Check `AudioManager.isBluetoothScoOn()` for current state
- Register `BroadcastReceiver` for `ACTION_SCO_AUDIO_STATE_CHANGED`

### Alternative Considered
- `react-native-bluez` - too heavy for this simple need
- Native module via Expo - cleanest approach

## Implementation Steps

### Phase 1: Bluetooth Detection Service
1. Create native Android module for Bluetooth audio state
2. Expose via Expo TurboModule or legacy native module
3. Provide: `isBluetoothConnected()`, `addListener()`, `removeListener()`

### Phase 2: UI Updates
1. Update `CallAnnouncementCard` to show Bluetooth status
2. Add "Bluetooth-only" toggle switch
3. Persist preference in AsyncStorage

### Phase 3: Integration
1. Modify `useIncomingCallLink` to check Bluetooth state before announcing
2. Add Bluetooth state listener for dynamic updates

## File Changes

| File | Change |
|------|--------|
| `android/java/.../BluetoothStateModule.java` | New native module |
| `services/bluetooth.ts` | New - JS interface to native |
| `hooks/useBluetoothState.ts` | New - React hook |
| `components/CallAnnouncementCard.tsx` | Add toggle + status |
| `hooks/useIncomingCallLink.ts` | Check Bluetooth before announce |

## Testing
- Test with Bluetooth ON/OFF
- Test with no Bluetooth device paired
- Test during call transition (connect/disconnect mid-ring)
