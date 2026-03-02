# Tasks: Bluetooth-Aware Call Announcement

## T001: Create Bluetooth detection native module (Android)
- **File**: `android/app/src/main/java/com/ridr/app/BluetoothStateModule.java`
- **Description**: Create Expo native module to detect Bluetooth SCO audio state
- **Dependencies**: None
- **Parallel**: Yes [P]

## T002: Create Bluetooth service wrapper
- **File**: `services/bluetooth.ts`
- **Description**: TypeScript wrapper for native Bluetooth module
- **Dependencies**: T001
- **Parallel**: Yes [P]

## T003: Create useBluetoothState hook
- **File**: `hooks/useBluetoothState.ts`
- **Description**: React hook for Bluetooth state with listeners
- **Dependencies**: T002
- **Parallel**: No (uses T002)

## T004: Update CallAnnouncementCard UI
- **File**: `components/CallAnnouncementCard.tsx`
- **Description**: Add Bluetooth status indicator and "Bluetooth-only" toggle
- **Dependencies**: T003
- **Parallel**: No (uses T003)

## T005: Integrate Bluetooth check in call announcement
- **File**: `hooks/useIncomingCallLink.ts`
- **Description**: Check Bluetooth state before announcing call
- **Dependencies**: T003, T004
- **Parallel**: No

## T006: Persist Bluetooth-only preference
- **File**: `hooks/useCallAnnouncement.ts`
- **Description**: Add AsyncStorage key for Bluetooth-only mode
- **Dependencies**: T004
- **Parallel**: No (uses T004)

## T007: Update config plugin for Bluetooth permissions
- **File**: `plugins/withCallDetection.js`
- **Description**: Add BLUETOOTH and BLUETOOTH_ADMIN permissions
- **Dependencies**: None
- **Parallel**: Yes [P]

## Execution Order

```
Parallel (T001, T007)
    ↓
T002 (depends on T001)
    ↓
T003 (depends on T002)
    ↓
Parallel (T004, T006) (depend on T003)
    ↓
T005 (depends on T004, T003)
```

## Parallel Groups

| Group | Tasks | Reason |
|-------|-------|--------|
| 1 | T001, T007 | Independent native changes |
| 2 | T004, T006 | Both UI changes after T003 |
