import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function CustoScreen() {
  const router = useRouter();

  // Configuration des boutons pour éviter la répétition de code
  const menuItems = [
    {
      id: "1",
      title: "Créer\nExercice",
      icon: "add-circle",
      route: "/create-exercise-page",
      color: "#34C759",
    },
    {
      id: "2",
      title: "Gérer\nExercices",
      icon: "list",
      route: "/manage-exercises-page",
      color: "#5856D6",
    },
    {
      id: "3",
      title: "Créer\nSession",
      icon: "add-circle",
      route: "/create-session-page",
      color: "#FF9500",
    },
    {
      id: "4",
      title: "Gérer\nSessions",
      icon: "list",
      route: "/manage-sessions-page",
      color: "#FF3B30",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.grid}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            onPress={() => router.push(item.route as any)}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.iconCircle,
                { backgroundColor: item.color + "15" },
              ]}
            >
              <Ionicons name={item.icon as any} size={32} color={item.color} />
            </View>
            <Text style={styles.cardTitle}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    padding: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1A1A1A",
    marginBottom: 25,
    marginTop: 20,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 15,
  },
  card: {
    width: "47%", // Pour avoir 2 colonnes avec un peu d'espace
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    // Ombres
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
    textAlign: "center",
    color: "#333",
    lineHeight: 20,
  },
});
