import {
  StyleSheet,
  View,
  Text,
  Platform,
  ScrollView,
} from "react-native";
import { useCallAnnouncement } from "@/hooks/useCallAnnouncement";
import { useIncomingCallLink } from "@/hooks/useIncomingCallLink";
import { CallAnnouncementCard } from "@/components/CallAnnouncementCard";

export default function HomeScreen() {
  const { enabled, toggle, isLoading } = useCallAnnouncement();
  useIncomingCallLink(enabled);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Ridr</Text>
      <Text style={styles.subtitle}>Rider-focused call announcement</Text>

      {Platform.OS === "android" ? (
        <CallAnnouncementCard
          enabled={enabled}
          onToggle={toggle}
          isLoading={isLoading}
        />
      ) : (
        <View style={styles.iosCard}>
          <Text style={styles.iosTitle}>iOS Users</Text>
          <Text style={styles.iosText}>
            On iPhone, use the built-in Announce Calls feature:
          </Text>
          <Text style={styles.iosSteps}>
            Settings → Phone → Announce Calls → Headphones Only
          </Text>
          <Text style={styles.iosHint}>
            Your AirPods will announce caller names and you can say "answer" or
            "decline."
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0a0a0a" },
  content: {
    flexGrow: 1,
    padding: 24,
    paddingBottom: 48,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 24,
  },
  subtitle: {
    fontSize: 16,
    color: "#9ca3af",
    marginTop: 8,
    marginBottom: 32,
  },
  iosCard: {
    backgroundColor: "#1f2937",
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
  },
  iosTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 12,
  },
  iosText: {
    fontSize: 15,
    color: "#d1d5db",
    marginBottom: 8,
  },
  iosSteps: {
    fontSize: 14,
    color: "#22c55e",
    fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
    marginBottom: 12,
  },
  iosHint: {
    fontSize: 14,
    color: "#9ca3af",
    fontStyle: "italic",
  },
});
