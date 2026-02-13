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

export default function CreateExerciseScreen() {
  const [name, setName] = useState("");
  const router = useRouter();

  const handleSave = async () => {
    // Check
    if (name.trim().length === 0) {
      Alert.alert("Erreur", "Le nom de l'exercice ne peut pas être vide.");
      return;
    }

    // Add
    try {
      await addExercise(name);
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
