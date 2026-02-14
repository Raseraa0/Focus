import { StyleSheet, Text, View } from "react-native";
import { ExercisesType } from "../database/dataType";

/**
 * @name ExercisesTile
 *
 * Display a tile with most useful data
 * relative to an exercises
 *
 * @param item Item containing all informations concerning
 * an exercises, based on the exercises scema model
 */
export default function ExercisesTile(item: ExercisesType) {
  return (
    <View key={item.id} style={styles.card}>
      <View style={styles.cardInfo}>
        <Text style={styles.exerciseName}>{item.name}</Text>
        {item.note ? (
          <Text style={styles.exerciseNote}>{item.note}</Text>
        ) : (
          <Text style={styles.noNote}>Aucune note</Text>
        )}
      </View>
    </View>
  );
}

/**
 * StyleSheet
 */
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginTop: 12,
    padding: 16,
    borderRadius: 12,
    // Ombre pour iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    // Ombre pour Android
    elevation: 3,
  },
  cardInfo: {
    flexDirection: "column",
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 4,
  },
  exerciseNote: {
    fontSize: 14,
    color: "#666",
    fontStyle: "italic",
  },
  noNote: {
    fontSize: 12,
    color: "#AAA",
    fontStyle: "italic",
  },
});
