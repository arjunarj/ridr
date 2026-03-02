import { useEffect, useRef } from "react";
import { Linking, Platform } from "react-native";
import { announceIncomingCall } from "@/services/callAnnouncement";

export function useIncomingCallLink(enabled: boolean) {
  const enabledRef = useRef(enabled);
  enabledRef.current = enabled;

  useEffect(() => {
    if (Platform.OS !== "android") return;

    const handler = (event: { url: string }) => {
      const url = event.url;
      if (!url.startsWith("ridr://incoming")) return;
      try {
        const u = new URL(url);
        const number = u.searchParams.get("number") ?? "";
        if (enabledRef.current) {
          announceIncomingCall(number);
        }
      } catch {
        // ignore parse errors
      }
    };

    const sub = Linking.addEventListener("url", handler);

    Linking.getInitialURL().then((url) => {
      if (url) handler({ url });
    });

    return () => sub.remove();
  }, []);
}
