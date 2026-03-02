import * as Contacts from "expo-contacts";
import { Platform } from "react-native";

/**
 * Look up a contact display name by phone number.
 */
export async function lookupContactName(
  phoneNumber: string
): Promise<string | null> {
  if (Platform.OS !== "android") return null;

  try {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status !== "granted") return null;

    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.PhoneNumbers],
    });

    const normalized = normalizePhone(phoneNumber);
    for (const contact of data) {
      const numbers = contact.phoneNumbers ?? [];
      for (const p of numbers) {
        if (p.number && normalizePhone(p.number) === normalized) {
          return contact.name ?? null;
        }
      }
    }
    return null;
  } catch {
    return null;
  }
}

function normalizePhone(num: string): string {
  return num.replace(/\D/g, "").slice(-10);
}
