import { StyleSheet, View, Text } from "react-native";

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.subtitle}>Configure Ridr for your rides</Text>
      <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>More options coming soon</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
    padding: 24,
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
  placeholder: {
    backgroundColor: "#1f2937",
    borderRadius: 12,
    padding: 24,
  },
  placeholderText: {
    color: "#6b7280",
    fontSize: 15,
  },
});
