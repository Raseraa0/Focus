import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Keyboard, StyleSheet, View } from "react-native";
import ActiveLabels from "./components/ActiveLabels";
import LabelPopup from "./components/LabelPopup";
import { ButtonMy } from "./components/ui/Button";
import Close from "./components/ui/Close";
import { HeaderTitle } from "./components/ui/Header";
import { InputValue } from "./components/ui/InputArea";
import { LabelType } from "./database/dataType";
import { updateExercise } from "./database/exerciseService";
import { ExercisesWithLabelsType } from "./database/joinDateType";
import { getLabels } from "./database/labelsService";
import { goBack } from "./utils/goBack";

/**
 * @name CreateExerciseScreen
 */
export default function EditExerciseScreen() {
  const params = useLocalSearchParams();
  const exerciseData = JSON.parse(
    params.exercise as string
  ) as ExercisesWithLabelsType;

  // Name of the created exercise
  const [name, setName] = useState(exerciseData.name || "");

  // Note of the created exercise
  const [note, setNote] = useState(exerciseData.note || "");

  // All labels from databse
  const [allLabels, setAllLabels] = useState<LabelType[]>([]);

  // Current selected labels
  const [labels, setLabels] = useState<LabelType[]>(exerciseData.labels || []);

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

  const checkDiffEx = () => {
    const isNameSame = exerciseData.name === name;
    const isNoteSame = exerciseData.note === note;

    // Comparaison profonde simple pour les IDs de labels
    const oldIds =
      exerciseData.labels
        ?.map((l) => l.id)
        .sort()
        .join(",") || "";
    const newIds =
      labels
        .map((l) => l.id)
        .sort()
        .join(",") || "";
    const isLabelsSame = oldIds === newIds;

    // Retourne TRUE si TOUT est identique (pas de changement)
    return isNameSame && isNoteSame && isLabelsSame;
  };

  /**
   * @name handleSave
   *
   * Check input data and insert the new exercise
   * into the exercises table in database
   */
  // 2. Correction du handleSave
  const handleSave = async () => {
    if (name.trim().length === 0) {
      Alert.alert("Erreur", "Le nom de l'exercice ne peut pas être vide.");
      return;
    }

    try {
      if (checkDiffEx()) {
        goBack(router);
        return; // <--- TRÈS IMPORTANT : on arrête la fonction ici
      }

      const labelsID = labels.map((item) => item.id);
      await updateExercise(exerciseData.id, name, note, labelsID);

      Alert.alert("Succès", `L'exercice "${name}" a été mis à jour !`, [
        { text: "Ok", onPress: () => goBack(router) },
      ]);
    } catch (error) {
      console.error(error);
      Alert.alert("Erreur", "Impossible de modifier l'exercice.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <HeaderTitle title={"Modification de l'Exercice"} />
        <Close
          onPress={() => {
            if (!checkDiffEx()) {
              Alert.alert(
                "Attention",
                "Les données non sauvegardé seront perdu voulez vous quitter ?",
                [
                  { text: "Oui", onPress: () => goBack(router) },
                  {
                    text: "Non",
                  },
                ]
              );
            } else {
              goBack(router);
            }
          }}
        />
      </View>
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
          <ButtonMy
            text="Ajouter un label"
            onPress={() => {
              Keyboard.dismiss();
              setTimeout(() => {
                setShowPopup(true);
              }, 100);
              setShowPopup(true);
            }}
          ></ButtonMy>
        </View>
        <ButtonMy text="Modifier" onPress={handleSave} />
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
});
