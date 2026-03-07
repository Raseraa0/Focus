import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SetsType } from "../database/dataType";

type Props = {
  id: number;
  name: string;
  note: string;
  defaultSets?: SetsType[];
  isActive: number;
  onDelete?: () => void;
  onUpdate?: (arg0: SetsType[]) => void;
};

export default function ExercisesTile2({
  id,
  name,
  note,
  isActive,
  defaultSets = [{ id: 1, reps: "", preset_exo_id: -1, position: 1 }],
  onDelete,
  onUpdate,
}: Props) {
  // Initialisation avec une série par défaut
  const [sets, setSets] = useState<SetsType[]>(defaultSets);

  const addSerie = () => {
    const newId = sets.length > 0 ? sets[sets.length - 1].id + 1 : 1;
    setSets([
      ...sets,
      { id: newId, reps: "", position: newId, preset_exo_id: -1 },
    ]);
  };

  const updateReps = (id: number, text: string) => {
    const newSets = sets.map((s) => (s.id === id ? { ...s, reps: text } : s));
    setSets(newSets);
    onUpdate && onUpdate(newSets); // On informe le parent
  };

  return (
    <View style={styles.container}>
      {/* En-tête de l'exercice */}
      <View style={styles.header}>
        <Text style={styles.exerciseName}>{name}</Text>
        {note && <Text style={styles.noteText}>{note}</Text>}
        <TouchableOpacity
          onPress={() => onDelete && onDelete()}
          style={styles.deleteButton}
        >
          <Text style={styles.deleteText}>✕</Text>
        </TouchableOpacity>
      </View>

      {/* Liste des séries */}
      <View style={styles.seriesContainer}>
        {sets.map((serie, index) => (
          <View key={serie.id} style={styles.serieRow}>
            <Text style={styles.serieLabel}>Série {index + 1}</Text>
            <TextInput
              style={styles.input}
              placeholder="rep"
              keyboardType="numeric"
              value={serie.reps}
              onChangeText={(text) => updateReps(serie.id, text)}
            />
          </View>
        ))}
      </View>

      {/* Bouton pour ajouter une série */}
      <TouchableOpacity style={styles.addButton} onPress={addSerie}>
        <Text style={styles.addButtonText}>+ Ajouter une série</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    marginBottom: 12,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  noteText: {
    fontSize: 14,
    color: "#666",
    fontStyle: "italic",
  },
  seriesContainer: {
    marginBottom: 10,
  },
  serieRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  serieLabel: {
    fontSize: 16,
    color: "#444",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: 100,
    textAlign: "center",
  },
  addButton: {
    marginTop: 5,
    alignItems: "center",
    padding: 8,
  },
  addButtonText: {
    color: "#007AFF",
    fontWeight: "600",
  },
  deleteButton: {
    padding: 8,
    marginLeft: 10,
  },
  deleteText: {
    color: "#FF3B30",
    fontSize: 20,
    fontWeight: "bold",
  },
});
