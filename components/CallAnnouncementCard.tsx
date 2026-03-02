import {
  StyleSheet,
  View,
  Text,
  Switch,
  ActivityIndicator,
} from "react-native";

interface CallAnnouncementCardProps {
  enabled: boolean;
  onToggle: () => void;
  isLoading?: boolean;
}

export function CallAnnouncementCard({
  enabled,
  onToggle,
  isLoading,
}: CallAnnouncementCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Call Announcement</Text>
      <Text style={styles.cardDesc}>
        When a call comes in, Ridr will announce the caller's name (or "unknown
        number") and prompt you to answer or decline.
      </Text>
      <View style={styles.row}>
        <Text style={styles.label}>{enabled ? "Enabled" : "Disabled"}</Text>
        {isLoading ? (
          <ActivityIndicator color="#22c55e" />
        ) : (
          <Switch
            value={enabled}
            onValueChange={onToggle}
            trackColor={{ false: "#374151", true: "#166534" }}
            thumbColor={enabled ? "#22c55e" : "#9ca3af"}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1f2937",
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 8,
  },
  cardDesc: {
    fontSize: 14,
    color: "#9ca3af",
    lineHeight: 22,
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 16,
    color: "#d1d5db",
  },
});
