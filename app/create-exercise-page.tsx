import { addExercise } from "@/app/database/exerciseService";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import ActiveLabels from "./components/activeLabels";
import AddLabelButton from "./components/addLabelButton";
import HeaderWithClose from "./components/header";
import InputValue from "./components/inputValue";
import LabelPopup from "./components/labelPopup";
import SaveButton from "./components/saveButton";
import { LabelType } from "./database/dataType";
import { getLabels } from "./database/labelsService";

/**
 * @name CreateExerciseScreen
 *
 * Page to create an exercise
 */
export default function CreateExerciseScreen() {
  // Name of the created exercise
  const [name, setName] = useState("");

  // Note of the created exercise
  const [note, setNote] = useState("");

  const [allLabels, setAllLabels] = useState<LabelType[]>([
    // { name: "push", id: 3 },
    // { name: "pull", id: 4 },
    // { name: "leg", id: 5 },
    // { name: "abdo", id: 6 },
  ]);

  const [labels, setLabels] = useState<LabelType[]>([]);

  const [showPopup, setShowPopup] = useState(false);

  // Router for navigation
  const router = useRouter();

  useEffect(() => {
    loadLabels();
  }, []);

  const loadLabels = async () => {
    const loadedLabels = await getLabels();
    setAllLabels(loadedLabels);
  };

  /**
   * @name handleSave
   *
   * Check input data and insert the new exercise
   * into the exercises table in database
   */
  const handleSave = async () => {
    // Check name cannot be null
    if (name.trim().length === 0) {
      Alert.alert("Erreur", "Le nom de l'exercice ne peut pas être vide.");
      return;
    }

    // Add the exercise to the databse
    try {
      await addExercise(name, note);
      Alert.alert("Succès", `L'exercice "${name}" a été créé !`, [
        { text: "Retour", onPress: () => router.back() },
        {
          text: "Créer un autre",
          onPress: () => {
            setName("");
            setNote("");
          },
        },
      ]);
    } catch (error) {
      console.error(error);
      Alert.alert("Erreur", "Impossible d'enregistrer l'exercice.");
    }
  };

  return (
    <View style={styles.container}>
      <HeaderWithClose title="Nouvel Exercice" />
      <View style={styles.wrapper}>
        <View style={styles.content}>
          <InputValue
            name={name}
            setName={setName}
            placeHolder="Ex : Développé couché"
            label="Nom de l'exercice"
            autoFocus={true}
          ></InputValue>

          <InputValue
            name={note}
            setName={setNote}
            placeHolder="..."
            label="Information supplémentaire"
            numberOfLines={4}
          ></InputValue>

          <ActiveLabels labels={labels} setLabels={setLabels} />
          <AddLabelButton setShowPopup={setShowPopup} />
        </View>
        <SaveButton onPress={handleSave} />
      </View>
      {showPopup && (
        <LabelPopup
          allLabels={allLabels}
          labels={labels}
          setLabels={setLabels}
          setShowPopup={setShowPopup}
        ></LabelPopup>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  wrapper: {
    padding: 20,
    flex: 1,
    justifyContent: "space-between",
    marginBottom: 30,
  },
  content: {
    flex: 1,
    gap: 20,
  },
});
