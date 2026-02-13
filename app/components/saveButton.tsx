import { StyleSheet, Text, TouchableOpacity } from "react-native";

type Props = {
  text?: string;
  onPress: () => void;
};

export default function SaveButton({ text = "Enregistrer", onPress }: Props) {
  return (
    <TouchableOpacity style={styles.saveButton} onPress={onPress}>
      <Text style={styles.saveButtonText}>{text}</Text>
    </TouchableOpacity>
  );
}

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
