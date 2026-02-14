import { getExercises } from "@/app/database/exerciseService";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import ExercisesTile from "./components/exercisesTile";
import SearchBar from "./components/searchBar";
import { ExercisesType } from "./database/db";

export default function ManageExercises() {
  const [exercises, setExercises] = useState<ExercisesType[]>([]);
  const [search, setSearch] = useState("");
  const [filteredExercises, setFilteredExercises] = useState<ExercisesType[]>(
    []
  );

  // 1. Charger les données au démarrage
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await getExercises();
    setExercises(data);
    setFilteredExercises(data); // Initialement, on affiche tout
  };

  // 2. Fonction de filtrage appelée à chaque changement de texte
  const handleSearch = (text: string) => {
    setSearch(text);

    if (text.trim() === "") {
      setFilteredExercises(exercises);
    } else {
      const filtered = exercises.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredExercises(filtered);
    }
  };

  return (
    <View style={styles.container}>
      {/* BARRE DE RECHERCHE */}
      <SearchBar
        value={search}
        placeHolder="Rechercher un exercice..."
        handleSearch={handleSearch}
      />

      {/* LISTE FILTRÉE */}
      <FlatList
        data={filteredExercises}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ExercisesTile
            id={item.id}
            isActive={item.isActive}
            name={item.name}
            note={item.note}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Aucun exercice trouvé</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  itemCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    alignItems: "center",
  },
  itemText: { fontSize: 17, color: "#333" },
  emptyText: { textAlign: "center", marginTop: 50, color: "#999" },
});
