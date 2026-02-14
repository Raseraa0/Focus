import { getExercises } from "@/app/database/exerciseService";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import ExercisesTile from "./components/exercisesTile";
import SearchBar from "./components/searchBar";
import { ExercisesType } from "./database/dataType";

/**
 * @name ManageExercisesScreen
 *
 * Page to manage all exercises
 */
export default function ManageExercisesScreen() {
  // Search filter typed by the user
  const [search, setSearch] = useState("");

  // List of all exercises fetched from the database
  const [exercises, setExercises] = useState<ExercisesType[]>([]);

  // List of all exercises fetched from database
  // but with a filter => containing filter substring
  const [filteredExercises, setFilteredExercises] = useState<ExercisesType[]>(
    []
  );

  // When the screen is created, load exercises data
  useEffect(() => {
    loadData();
  }, []);

  /**
   * @name loadData
   *
   * Get all exercises data from database and
   * map it to all exercises list
   * and to filtered exercises list (initially, their is no filter)
   */
  const loadData = async () => {
    const data = await getExercises();
    setExercises(data);
    setFilteredExercises(data);
  };

  /**
   * @name handleSearch
   * @param text Text typed in input filed
   */
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
      <SearchBar
        value={search}
        placeHolder="Rechercher un exercice..."
        handleSearch={handleSearch}
      />

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

/**
 * StyleSheet
 */
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
