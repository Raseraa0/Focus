import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Keyboard, ScrollView, StyleSheet, View } from "react-native";
import AddedExercises from "./components/AddedExercises";
import ExercisesPopup from "./components/ExercisesPopup";
import { ButtonMy } from "./components/ui/Button";
import Close from "./components/ui/Close";
import { HeaderTitle } from "./components/ui/Header";
import { InputValue } from "./components/ui/InputArea";
import { getExercisesWithLabels } from "./database/exerciseService";
import {
  ExercisesExpandType,
  PresetSessionsExpandType,
} from "./database/otherDataType";
import { updateSession } from "./database/sessionService";
import { goBack } from "./utils/goBack";

export default function EditSessionScreen() {
  const params = useLocalSearchParams();
  const sessionData = JSON.parse(
    params.session as string
  ) as PresetSessionsExpandType;

  const [name, setName] = useState(sessionData.name);

  const [note, setNote] = useState(sessionData.note);

  const [exercises, setExercises] = useState<ExercisesExpandType[]>(
    sessionData.exercises
  );

  const [allExercises, setAllExercises] = useState<ExercisesExpandType[]>([]);

  const [showPopup, setShowPopup] = useState(false);

  const router = useRouter();

  useEffect(() => {
    loadExercises();
  }, []);

  const loadExercises = async () => {
    const loadedExercises = await getExercisesWithLabels();
    setAllExercises(loadedExercises);
  };

  const checkDiffEx = () => {
    const isNameSame = sessionData.name === name;
    const isNoteSame = sessionData.note === note;

    // Comparaison profonde simple pour les IDs de labels
    const oldIds =
      sessionData.exercises
        ?.map((l) => l.id)
        .sort()
        .join(",") || "";
    const newIds =
      exercises
        .map((l) => l.id)
        .sort()
        .join(",") || "";
    const isLabelsSame = oldIds === newIds;

    // Retourne TRUE si TOUT est identique (pas de changement)
    return isNameSame && isNoteSame && isLabelsSame;
  };

  const handleSave = async () => {
    if (name.trim().length === 0) {
      Alert.alert("Erreur", "Le nom de la session ne peut pas être vide.");
      return;
    }

    // Préparation des données formatées
    const updatedData = {
      name: name,
      note: note,
      exercises: exercises.map((ex) => ({
        exerciseId: ex.id,
        sets: ex.sets || [{ id: 1, reps: "", position: 1, preset_exo_id: -1 }], // On récupère les séries saisies
      })),
    };

    try {
      if (checkDiffEx()) {
        goBack(router);
        return;
      }

      // APPEL DE L'UPDATE au lieu de ADD
      await updateSession(sessionData.id, updatedData);

      Alert.alert("Succès", `La session "${name}" a été mise à jour !`, [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch (error) {
      console.error(error);
      Alert.alert("Erreur", "Impossible de mettre à jour la session.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <HeaderTitle title={"Nouvel Session"} />
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
            placeHolder="Ex : Séance Push"
            label="Nom de la session"
            autoFocus={true}
          ></InputValue>

          <InputValue
            value={note}
            onChangeText={setNote}
            placeHolder="..."
            label="Information supplémentaire"
            numberOfLines={4}
          ></InputValue>

          <AddedExercises exercises={exercises} setExercises={setExercises} />
          <ButtonMy
            text="Ajouter un exercice"
            onPress={() => {
              Keyboard.dismiss();
              setTimeout(() => {
                setShowPopup(true);
              }, 100);
              setShowPopup(true);
            }}
          ></ButtonMy>
        </View>
        <ButtonMy text="Sauvegarder" onPress={handleSave} />
      </View>
      {showPopup && (
        <ExercisesPopup
          allExercises={allExercises}
          setAllExercises={setAllExercises}
          exercises={exercises}
          setExercises={setExercises}
          setShowPopup={setShowPopup}
          canAddExercise
        ></ExercisesPopup>
      )}
    </ScrollView>
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
