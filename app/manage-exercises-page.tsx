import { deleteExercise, getExercises } from "@/app/database/exerciseService";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ActiveLabels from "./components/ActiveLabels";
import ExercisesTile from "./components/ExercisesTile";
import LabelPopup from "./components/LabelPopup";
import { ButtonMy } from "./components/ui/Button";
import Close from "./components/ui/Close";
import { HeaderTitle } from "./components/ui/Header";
import { SearchInput } from "./components/ui/SearchInput";
import { LabelType } from "./database/dataType";
import { ExercisesWithLabelsType } from "./database/joinDateType";
import { getLabels, getLabelsByExercise } from "./database/labelsService";
import { askConfirmation } from "./utils/askConfirmation";
import { goBack } from "./utils/goBack";
import { labelsFilterEx } from "./utils/labelsFilterEx";
import { textFilterEx } from "./utils/textFilterEx";

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

  const router = useRouter();

  // Every time a filter change (search or labels)
  // We are updating the shown exercices
  useEffect(() => {
    const filtered1 = textFilterEx(exercises, search);
    const filtered2 = labelsFilterEx(filtered1, labels);
    setFilteredExercises(filtered2);
  }, [search, labels, exercises]);

  // When the screen is created, load data
  // useEffect(() => {
  //   loadData();
  //   loadLabels();
  // }, []);

  useFocusEffect(
    useCallback(() => {
      loadData(); // Ta fonction qui récupère les exercices en base
      loadLabels();
    }, [])
  );

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
      })
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
      <View style={styles.header}>
        <HeaderTitle title={"Tous les exercices"} />
        <Close onPress={() => goBack(router)} />
      </View>
      <SearchInput
        value={search}
        placeHolder="Rechercher un exercice..."
        handleSearch={handleSearch}
      />

      <ButtonMy
        text="Filter par label"
        onPress={() => {
          Keyboard.dismiss();
          setTimeout(() => {
            setShowPopup(true);
          }, 100);
          setShowPopup(true);
        }}
      ></ButtonMy>
      <ActiveLabels labels={labels} setLabels={setLabels} />

      <FlatList
        data={filteredExercises}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/edit-exercise-page",
                params: { exercise: JSON.stringify(item) },
              })
            }
          >
            <ExercisesTile
              id={item.id}
              isActive={item.isActive}
              name={item.name}
              note={item.note}
              labels={item.labels}
              onDelete={async (id) => {
                const confirmed = await askConfirmation();
                if (confirmed) {
                  await deleteExercise(id);
                  loadData();
                }
              }}
            ></ExercisesTile>
          </TouchableOpacity>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
});
