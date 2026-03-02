# Ridr - Specification

## Overview

Ridr is a rider-focused mobile app. Riders (motorcyclists, cyclists) often use Bluetooth headsets (e.g., AirPods) and cannot easily answer or decline calls. Ridr helps by announcing caller names and prompting the user to attend or decline.

## MVP: Call Announcement

### User Story

As a rider with a Bluetooth headset connected, when I receive an incoming call, I want the app to:
1. Announce the caller's name (or "unknown number" if not in contacts)
2. Prompt me to answer or decline
3. Let me respond (e.g., via voice or on-screen buttons)

### Platform Behavior

| Platform | Behavior |
|----------|----------|
| **Android** | Full implementation: BroadcastReceiver detects calls, TTS announces caller, UI/voice for answer/decline |
| **iOS** | Informational screen only: guide users to Settings → Phone → Announce Calls → Headphones Only |

### Acceptance Criteria

- [ ] Android: Incoming call triggers TTS announcement of caller name or "unknown number"
- [ ] Android: User can enable/disable call announcement in app
- [ ] Android: Permissions (phone state, contacts) requested with clear rationale
- [ ] iOS: Clear instructions for using built-in Announce Calls
- [ ] Both: Clean, accessible UI with dark theme suitable for outdoor use

## Future Features (Backlog)

- Ride logging (start/stop, duration)
- Quick contacts (one-tap call/SMS while riding)
- Emergency mode (auto-respond, share location)
- Weather alerts
- Battery widget (helmet/headset)
