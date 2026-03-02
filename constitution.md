# Ridr - Constitution

Project principles and development guidelines.

## Principles

1. **Android-first for call features**  
   Call announcement is only feasible on Android. iOS users are directed to the built-in Announce Calls feature.

2. **Accessibility for riders**  
   Design for hands-free, eyes-up use: voice prompts, minimal taps, high-contrast UI.

3. **Privacy by design**  
   Contact data is used locally only. No phone numbers or call metadata are sent to external servers.

4. **Spec-driven development**  
   Use Spec Kit (constitution, spec, plan, tasks) to align requirements and implementation.

5. **Cross-platform where possible**  
   Shared UI and logic where platforms allow; platform-specific flows when necessary.

## Tech Stack (Locked)

- React Native + Expo
- TypeScript
- Expo Router (file-based)
- Zustand or React Context for state
- expo-speech for TTS
- expo-contacts for contact lookup
