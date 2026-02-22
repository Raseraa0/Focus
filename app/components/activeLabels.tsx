import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ExoLabelType } from "../database/dataType";

type Props = {
  labels: ExoLabelType[];
  setLabels: (arg0: ExoLabelType[]) => void;
};

export default function ActiveLabels({ labels, setLabels }: Props) {
  const deleteLabel = (labelID: number) => {
    const newLabels = labels.filter((item) => item.id !== labelID);
    setLabels(newLabels);
  };

  return (
    <View style={styles.container}>
      {labels.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.item}
          onPress={() => deleteLabel(item.id)}
        >
          <Text style={styles.item}>{item.name}</Text>
          <Ionicons name="close"></Ionicons>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },

  item: {
    margin: 5,
    padding: 3,
    borderRadius: 8,
    backgroundColor: "#FF0000",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
