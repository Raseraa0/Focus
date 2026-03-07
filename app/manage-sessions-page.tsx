import { deleteSession, getSessions } from "@/app/database/sessionService";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Close from "./components/ui/Close";
import { HeaderTitle } from "./components/ui/Header";
import { SearchInput } from "./components/ui/SearchInput";
import { PresetSessionsExpandType } from "./database/otherDataType";
import { askConfirmation } from "./utils/askConfirmation";
import { goBack } from "./utils/goBack";

export default function ManageSessionsScreen() {
  const [search, setSearch] = useState("");
  const [sessions, setSessions] = useState<PresetSessionsExpandType[]>([]);
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const loadData = async () => {
    const data = await getSessions();
    setSessions(data);
  };

  const filteredSessions = sessions.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id: number) => {
    const confirmed = await askConfirmation();
    if (confirmed) {
      await deleteSession(id);
      loadData();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <HeaderTitle title={"Mes Sessions"} />
        <Close onPress={() => goBack(router)} />
      </View>

      <SearchInput
        value={search}
        placeHolder="Rechercher une session..."
        handleSearch={setSearch}
      />

      <FlatList
        data={filteredSessions}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View style={styles.sessionCard}>
            <TouchableOpacity
              style={styles.sessionInfo}
              onPress={() =>
                router.push({
                  pathname: "/edit-session-page",
                  params: { session: JSON.stringify(item) },
                })
              }
            >
              <Text style={styles.sessionName}>{item.name}</Text>
              <Text style={styles.exerciseCount}>
                {item.exercises.length} exercice
                {item.exercises.length > 1 ? "s" : ""}
              </Text>
              <Text style={styles.exerciseList} numberOfLines={1}>
                {item.exercises.map((ex: any) => ex.name).join(", ")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleDelete(item.id)}
              style={styles.deleteBtn}
            >
              <Text style={styles.deleteText}>✕</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Aucune session créée</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  sessionCard: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    marginHorizontal: 20,
    marginVertical: 8,
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eee",
  },
  sessionInfo: { flex: 1 },
  sessionName: { fontSize: 18, fontWeight: "bold", color: "#333" },
  exerciseCount: { fontSize: 12, color: "#666", marginTop: 2 },
  exerciseList: {
    fontSize: 13,
    color: "#888",
    marginTop: 4,
    fontStyle: "italic",
  },
  deleteBtn: { padding: 10, marginLeft: 10 },
  deleteText: { color: "#FF3B30", fontSize: 18, fontWeight: "bold" },
  emptyText: { textAlign: "center", marginTop: 50, color: "#999" },
});
