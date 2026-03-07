import { Ionicons } from "@expo/vector-icons";
import { Text } from "@react-navigation/elements";
import { useState } from "react";
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {
  addExercise,
  getExercisesWithLabels,
} from "../database/exerciseService";
import { ExercisesExpandType } from "../database/otherDataType";
import { textFilterEx } from "../utils/textFilterEx";
import { ButtonMy } from "./ui/Button";
import Close from "./ui/Close";
import { InputValue } from "./ui/InputArea";
import { SearchInput } from "./ui/SearchInput";

type Props = {
  allExercises: ExercisesExpandType[];
  setAllExercises: (arg0: ExercisesExpandType[]) => void;
  exercises: ExercisesExpandType[];
  setExercises: (arg0: ExercisesExpandType[]) => void;
  setShowPopup: (arg0: boolean) => void;
  canAddExercise: boolean;
};

export default function ExercisesPopup({
  allExercises,
  setAllExercises,
  exercises,
  setExercises,
  setShowPopup,
  canAddExercise,
}: Props) {
  const onPressItem = (item: ExercisesExpandType) => {
    setExercises(exercises.concat(item));
    setShowPopup(false);
  };

  const loadExercises = async () => {
    const loadedExercises = await getExercisesWithLabels();
    setAllExercises(loadedExercises);
  };

  const [newExerciseName, setNewExerciseName] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const [search, setSearch] = useState("");

  const [filteredExercises, setFilteredExercises] =
    useState<ExercisesExpandType[]>(allExercises);

  const handleSearch = (text: string) => {
    setSearch(text);

    const filtered = textFilterEx(allExercises, text);
    setFilteredExercises(filtered);
  };

  const saveNewExercise = async () => {
    if (newExerciseName.trim() !== "") {
      let exerciseID: number;
      try {
        exerciseID = await addExercise(newExerciseName, "", []);
      } catch (e) {
        const mess: string = "L'exercice " + newExerciseName + " existe déjà.";
        setErrorMessage(mess);
        return;
      }
      onPressItem({
        id: exerciseID,
        name: newExerciseName,
        isActive: 1,
        labels: [],
      });
      loadExercises();
    }
  };

  return (
    <Modal transparent={true} style={styles.modal}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.popup}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Exercises</Text>
            <Close size={24} onPress={() => setShowPopup(false)}></Close>
          </View>

          <SearchInput
            value={search}
            placeHolder="Rechercher un exercises..."
            handleSearch={handleSearch}
          />
          <FlatList
            style={styles.content}
            data={filteredExercises.filter((item) => item.isActive === 1)}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={
                  exercises.some((item2) => {
                    return item2.id === item.id;
                  })
                    ? styles.itemOff
                    : styles.item
                }
                disabled={exercises.some((item2) => {
                  return item2.id === item.id;
                })}
                onPress={() => onPressItem(item)}
              >
                <Text>{item.name}</Text>
                <Ionicons name="add-circle-outline" size={26}></Ionicons>
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <Text style={styles.noitem}>Aucun Exercice</Text>
            }
          ></FlatList>
          {canAddExercise && (
            <View>
              <Text>{errorMessage}</Text>
              <InputValue
                value={newExerciseName}
                placeHolder="New Exercise"
                onChangeText={setNewExerciseName}
              />
              <ButtonMy text="Nouveau exercice" onPress={saveNewExercise} />
            </View>
          )}
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  title: {
    fontSize: 21,
    fontWeight: "bold",
  },
  popup: {
    marginHorizontal: 50,
    marginVertical: 100,
    borderRadius: 20,
    flex: 1,
    backgroundColor: "#bfdbfe",
    borderStyle: "solid",
    borderColor: "#1e3a8a",
    borderWidth: 3,
    padding: 30,
    display: "flex",
    flexDirection: "column",
  },
  content: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
  },
  item: {
    backgroundColor: "#38bdf8",
    borderStyle: "solid",
    borderColor: "#0c4a6e",
    borderRadius: 3,
    borderWidth: 3,
    marginTop: 12,
    padding: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemOff: {
    backgroundColor: "#38bdf8",
    opacity: 0.4,
    borderStyle: "solid",
    borderColor: "#0c4a6e",
    borderRadius: 3,
    borderWidth: 3,
    marginTop: 12,
    padding: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  noitem: {},
});
