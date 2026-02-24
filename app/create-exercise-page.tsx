import { addExercise } from "@/app/database/exerciseService";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { OpenPopupButton, SaveButton } from "./components/Button";
import HeaderWithClose from "./components/Header";
import ActiveLabels from "./components/high/ActiveLabels";
import LabelPopup from "./components/high/LabelPopup";
import { InputValue } from "./components/InputArea";
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

  // All labels from databse
  const [allLabels, setAllLabels] = useState<LabelType[]>([]);

  // Current selected labels
  const [labels, setLabels] = useState<LabelType[]>([]);

  // If popUp is shown (for label)
  const [showPopup, setShowPopup] = useState(false);

  // Router for navigation
  const router = useRouter();

  // When the screen is created, load data
  useEffect(() => {
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
      // Get the list of labels ID
      const labelsID = labels.map((item) => item.id);

      // Add the exercises
      await addExercise(name, note, labelsID);
      Alert.alert("Succès", `L'exercice "${name}" a été créé !`, [
        { text: "Retour", onPress: () => router.back() },
        {
          text: "Créer un autre",
          onPress: () => {
            // Clean area
            setName("");
            setNote("");
            setLabels([]);
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
            value={name}
            onChangeText={setName}
            placeHolder="Ex : Développé couché"
            label="Nom de l'exercice"
            autoFocus={true}
          ></InputValue>

          <InputValue
            value={note}
            onChangeText={setNote}
            placeHolder="..."
            label="Information supplémentaire"
            numberOfLines={4}
          ></InputValue>

          <ActiveLabels labels={labels} setLabels={setLabels} />
          <OpenPopupButton
            text="Ajouter un label"
            setShowPopup={setShowPopup}
          />
        </View>
        <SaveButton onPress={handleSave} />
      </View>
      {showPopup && (
        <LabelPopup
          allLabels={allLabels}
          setAllLabels={setAllLabels}
          labels={labels}
          setLabels={setLabels}
          setShowPopup={setShowPopup}
          canAddLabel
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
