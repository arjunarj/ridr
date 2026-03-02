import * as Speech from "expo-speech";
import { Platform } from "react-native";
import { lookupContactName } from "./contacts";

export async function announceIncomingCall(phoneNumber: string) {
  if (Platform.OS !== "android") return;

  const name = await lookupContactName(phoneNumber);
  const displayName = name || "Unknown number";

  const text = `${displayName} is calling. Say answer or decline.`;
  await Speech.speak(text, {
    language: "en-US",
    pitch: 1,
    rate: 0.9,
  });
}

export function stopAnnouncement() {
  Speech.stop();
}
