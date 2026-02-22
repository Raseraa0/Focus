import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type Props = {
  text: string;
  setShowPopup: (arg0: boolean) => void;
};

export default function AddLabelButton({ setShowPopup, text }: Props) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        setShowPopup(true);
      }}
    >
      <Ionicons name="add-circle-sharp" color="#fff" size={24}></Ionicons>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#22d3ee",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
  },

  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
