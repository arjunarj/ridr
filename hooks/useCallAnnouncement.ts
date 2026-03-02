import { useState, useCallback, useEffect } from "react";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { requestCallAnnouncementPermissions } from "@/services/permissions";

const STORAGE_KEY = "ridr_call_announcement_enabled";

export function useCallAnnouncement() {
  const [enabled, setEnabledState] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (Platform.OS === "android") {
      AsyncStorage.getItem(STORAGE_KEY)
        .then((v) => setEnabledState(v === "true"))
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  const toggle = useCallback(async () => {
    if (Platform.OS !== "android") return;
    if (!enabled) {
      const granted = await requestCallAnnouncementPermissions();
      if (!granted) return;
    }
    const next = !enabled;
    setEnabledState(next);
    await AsyncStorage.setItem(STORAGE_KEY, String(next));
  }, [enabled]);

  return { enabled, toggle, isLoading };
}
