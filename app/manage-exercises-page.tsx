import { deleteExercise, getExercises } from "@/app/database/exerciseService";
import { useEffect, useState } from "react";
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
  // Search filter
  const [search, setSearch] = useState("");

  // All exercises from database
  const [exercises, setExercises] = useState<ExercisesWithLabelsType[]>([]);

  // If popUp is shown (for label)
  const [showPopup, setShowPopup] = useState(false);

  // All labels from databse
  const [allLabels, setAllLabels] = useState<LabelType[]>([]);

  // Current selected labels (for filtering)
  const [labels, setLabels] = useState<LabelType[]>([]);

  // Shown exercises (with applying filters)
  const [filteredExercises, setFilteredExercises] = useState<
    ExercisesWithLabelsType[]
  >([]);

  // Every time a filter change (search or labels)
  // We are updating the shown exercices
  useEffect(() => {
    const query = search.toLowerCase().trim();

    const filtered = exercises.filter((item) => {
      // Must contains text as substring
      const matchesText = item.name.toLowerCase().includes(query);

      // Must contains all labels
      const matchesLabels =
        labels.length === 0 ||
        labels.every((filterLabel) =>
          item.labels.some((exoLabel) => exoLabel.id === filterLabel.id),
        );

      return matchesText && matchesLabels;
    });

    // Set shown exercises
    setFilteredExercises(filtered);
  }, [search, labels, exercises]);

  // When the screen is created, load data
  useEffect(() => {
    loadData();
    loadLabels();
  }, []);

  /**
   * @name loadLabels
   *
   * Get all labels from databse and
   * map it to labels list
   */
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
   *
   * Also, for each exercises, get corresponding labals and map it.
   */
  const loadData = async () => {
    // Get all exercises
    const rawData = await getExercises();

    const data = await Promise.all(
      rawData.map(async (exo) => {
        // Get corresponding labels
        const correspondingLabels = await getLabelsByExercise(exo.id);
        // Add a labels filed to structure
        const ret: ExercisesWithLabelsType = {
          ...exo,
          labels: correspondingLabels || [],
        };
        return ret;
      }),
    );

    // Set exercises
    setExercises(data);
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
              await deleteExercise(id);
              loadData();
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
