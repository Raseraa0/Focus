import { deleteExercise, getExercises } from "@/app/database/exerciseService";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import ActiveLabels from "./components/high/activeLabels";
import ExercisesTile from "./components/high/exercisesTile";
import LabelPopup from "./components/high/labelPopup";
import AddLabelButton from "./components/low/addLabelButton";
import HeaderWithClose from "./components/low/header";
import SearchBar from "./components/low/searchBar";
import { LabelType } from "./database/dataType";
import { ExercisesWithLabelsType } from "./database/joinDateType";
import { getLabels, getLabelsByExercise } from "./database/labelsService";

/**
 * @name ManageExercisesScreen
 *
 * Page to manage all exercises
 */
export default function ManageExercisesScreen() {
  // Search filter typed by the user
  const [search, setSearch] = useState("");

  // List of all exercises fetched from the database
  const [exercises, setExercises] = useState<ExercisesWithLabelsType[]>([]);

  const [showPopup, setShowPopup] = useState(false);

  const [allLabels, setAllLabels] = useState<LabelType[]>([]);

  const [labels, setLabels] = useState<LabelType[]>([]);

  // List of all exercises fetched from database
  // but with a filter => containing filter substring
  const [filteredExercises, setFilteredExercises] = useState<
    ExercisesWithLabelsType[]
  >([]);

  useEffect(() => {
    const query = search.toLowerCase().trim();

    const filtered = exercises.filter((item) => {
      // 1. Vérification du texte (nom de l'exercice)
      const matchesText = item.name.toLowerCase().includes(query);

      // 2. Vérification des labels (doit contenir TOUS les labels du filtre)
      // Si aucun label n'est sélectionné dans le filtre, on laisse passer
      const matchesLabels =
        labels.length === 0 ||
        labels.every((filterLabel) =>
          item.labels.some((exoLabel) => exoLabel.id === filterLabel.id)
        );

      return matchesText && matchesLabels;
    });

    setFilteredExercises(filtered);
  }, [search, labels, exercises]);

  // When the screen is created, load exercises data
  useEffect(() => {
    loadData();
    loadLabels();
  }, []);

  const loadLabels = async () => {
    const loadedLabels = await getLabels();
    setAllLabels(loadedLabels);
  };

  /**
   * @name loadData
   *
   * Get all exercises data from database and
   * map it to all exercises list
   * and to filtered exercises list (initially, their is no filter)
   */
  const loadData = async () => {
    const rawData = await getExercises();
    console.log("BRUT", rawData);

    const data = await Promise.all(
      rawData.map(async (exo) => {
        const correspondingLabels = await getLabelsByExercise(exo.id);
        const ret: ExercisesWithLabelsType = {
          ...exo,
          labels: correspondingLabels || [],
        };
        return ret;
      })
    );

    setExercises(data);
    console.log(data);
    setFilteredExercises(data);
  };

  /**
   * @name handleSearch
   * @param text Text typed in input filed
   */
  const handleSearch = (text: string) => {
    setSearch(text);
  };

  return (
    <View style={styles.container}>
      <HeaderWithClose title="Tous les exercices" />
      <SearchBar
        value={search}
        placeHolder="Rechercher un exercice..."
        handleSearch={handleSearch}
      />

      <AddLabelButton
        text="Filter par label"
        setShowPopup={setShowPopup}
      ></AddLabelButton>
      <ActiveLabels labels={labels} setLabels={setLabels} />

      <FlatList
        data={filteredExercises}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ExercisesTile
            id={item.id}
            isActive={item.isActive}
            name={item.name}
            note={item.note}
            labels={item.labels}
            onDelete={async (id) => {
              await deleteExercise(id); // Ta fonction de suppression en BDD
              loadData(); // On rafraîchit la liste
            }}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Aucun exercice trouvé</Text>
        }
      />
      {showPopup && (
        <LabelPopup
          allLabels={allLabels}
          setAllLabels={setAllLabels}
          labels={labels}
          setLabels={setLabels}
          setShowPopup={setShowPopup}
          canAddLabel={false}
        ></LabelPopup>
      )}
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
