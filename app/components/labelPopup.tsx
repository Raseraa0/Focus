import { Text } from "@react-navigation/elements";
import {
  FlatList,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { ExoLabelType } from "../database/dataType";
import Close from "./close";

type Props = {
  allLabels: ExoLabelType[];
  labels: ExoLabelType[];
  setLabels: (arg0: ExoLabelType[]) => void;
  setShowPopup: (arg0: boolean) => void;
};

export default function LabelPopup({
  allLabels,
  labels,
  setLabels,
  setShowPopup,
}: Props) {
  const onPressItem = (item: ExoLabelType) => {
    setLabels(labels.concat(item));
    setShowPopup(false);
  };

  return (
    <Modal transparent={true} style={styles.modal}>
      <View style={styles.popup}>
        <View style={styles.header}>
          <Text style={styles.title}>Labels</Text>
          <Close size={24} onPress={() => setShowPopup(false)}></Close>
        </View>
        <FlatList
          style={styles.content}
          data={allLabels}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={
                labels.some((item2) => {
                  return item2.id === item.id;
                })
                  ? styles.itemOff
                  : styles.item
              }
              disabled={labels.some((item2) => {
                return item2.id === item.id;
              })}
              onPress={() => onPressItem(item)}
            >
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={<Text style={styles.noitem}>Aucun Label</Text>}
        ></FlatList>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "#0f172a",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  title: {
    fontSize: 21,
    fontWeight: "bold",
  },
  popup: {
    marginHorizontal: 50,
    marginVertical: 100,
    borderRadius: 20,
    flex: 1,
    backgroundColor: "#bfdbfe",
    borderStyle: "solid",
    borderColor: "#1e3a8a",
    borderWidth: 3,
    padding: 30,
    display: "flex",
    flexDirection: "column",
  },
  content: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
  },
  item: {
    backgroundColor: "#38bdf8",
    borderStyle: "solid",
    borderColor: "#0c4a6e",
    borderRadius: 3,
    borderWidth: 3,
    marginTop: 12,
    padding: 15,
  },
  itemOff: {
    backgroundColor: "#38bdf8",
    opacity: 0.4,
    borderStyle: "solid",
    borderColor: "#0c4a6e",
    borderRadius: 3,
    borderWidth: 3,
    marginTop: 12,
    padding: 15,
  },
  noitem: {},
});
