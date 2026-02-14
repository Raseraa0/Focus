import { addExercise } from "@/app/database/exerciseService";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import HeaderWithClose from "./components/header";
import InputValue from "./components/inputValue";
import SaveButton from "./components/saveButton";

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

  // Router for navigation
  const router = useRouter();

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
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch (error) {
      console.error(error);
      Alert.alert("Erreur", "Impossible d'enregistrer l'exercice.");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <HeaderWithClose title="Nouvel Exercice" />
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
        ></InputValue>
        <SaveButton onPress={handleSave} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 20,
    flex: 1,
  },
});
