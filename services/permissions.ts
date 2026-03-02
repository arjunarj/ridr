import { Platform, PermissionsAndroid } from "react-native";
import * as Contacts from "expo-contacts";

export async function requestCallAnnouncementPermissions(): Promise<boolean> {
  if (Platform.OS !== "android") return false;

  try {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status !== "granted") return false;

    const phoneState = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
      {
        title: "Phone State",
        message:
          "Ridr needs access to detect incoming calls so it can announce the caller.",
        buttonNeutral: "Ask Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      }
    );
    if (phoneState !== PermissionsAndroid.RESULTS.GRANTED) return false;

    if (Platform.Version >= 29) {
      const answerCalls = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ANSWER_PHONE_CALLS,
        {
          title: "Answer Calls",
          message:
            "Ridr may answer or decline calls on your behalf when you say so.",
          buttonNeutral: "Ask Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (answerCalls !== PermissionsAndroid.RESULTS.GRANTED) return false;
    }

    return true;
  } catch {
    return false;
  }
}
