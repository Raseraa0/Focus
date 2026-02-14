import { StyleSheet, Text, TouchableOpacity } from "react-native";

/**
 * Propreties
 */
type Props = {
  text?: string;
  onPress: () => void;
};

/**
 * @name SaveButton
 *
 * Display a save green button, with "Save" typing in it.
 *
 * @param text Text to displayed on the button
 * @param onPress Action to execute when clicking the button
 */
export default function SaveButton({ text = "Enregistrer", onPress }: Props) {
  return (
    <TouchableOpacity style={styles.saveButton} onPress={onPress}>
      <Text style={styles.saveButtonText}>{text}</Text>
    </TouchableOpacity>
  );
}

/**
 * StyleSheet
 */
const styles = StyleSheet.create({
  saveButton: {
    backgroundColor: "#34C759",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
  },

  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
