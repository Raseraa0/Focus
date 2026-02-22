import { Ionicons } from "@expo/vector-icons";
import { Text } from "@react-navigation/elements";
import { useState } from "react";
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { LabelType } from "../../database/dataType";
import { addLabel, getLabels } from "../../database/labelsService";
import Close from "../low/close";
import InputValue from "../low/inputValue";
import SaveButton from "../low/saveButton";
import SearchBar from "../low/searchBar";

type Props = {
  allLabels: LabelType[];
  setAllLabels: (arg0: LabelType[]) => void;
  labels: LabelType[];
  setLabels: (arg0: LabelType[]) => void;
  setShowPopup: (arg0: boolean) => void;
  canAddLabel: boolean;
};

export default function LabelPopup({
  allLabels,
  setAllLabels,
  labels,
  setLabels,
  setShowPopup,
  canAddLabel,
}: Props) {
  const onPressItem = (item: LabelType) => {
    setLabels(labels.concat(item));
    setShowPopup(false);
  };

  const loadLabels = async () => {
    const loadedLabels = await getLabels();
    setAllLabels(loadedLabels);
  };

  const [newLabel, setNewLabel] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const [search, setSearch] = useState("");

  const [filteredLabels, setFilteredLabels] = useState<LabelType[]>(allLabels);

  const handleSearch = (text: string) => {
    setSearch(text);

    if (text.trim() === "") {
      setFilteredLabels(allLabels);
    } else {
      const filtered = labels.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredLabels(filtered);
    }
  };

  const saveNewLabel = async () => {
    if (newLabel.trim() !== "") {
      let labelID: number;
      try {
        labelID = await addLabel(newLabel);
      } catch (e) {
        const mess: string = "Le label " + newLabel + " existe déjà.";
        setErrorMessage(mess);
        return;
      }
      onPressItem({ id: labelID, name: newLabel });
      loadLabels();
    }
  };

  return (
    <Modal transparent={true} style={styles.modal}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.popup}
        >
          {/* <View style={styles.popup}> */}
          <View style={styles.header}>
            <Text style={styles.title}>Labels</Text>
            <Close size={24} onPress={() => setShowPopup(false)}></Close>
          </View>

          <SearchBar
            value={search}
            placeHolder="Rechercher un label..."
            handleSearch={handleSearch}
          />
          <FlatList
            style={styles.content}
            data={filteredLabels}
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
                <Ionicons name="add-circle-outline" size={26}></Ionicons>
              </TouchableOpacity>
            )}
            ListEmptyComponent={<Text style={styles.noitem}>Aucun Label</Text>}
          ></FlatList>
          {canAddLabel && (
            <View>
              <Text>{errorMessage}</Text>
              <InputValue
                name={newLabel}
                placeHolder="New label"
                setName={setNewLabel}
              />
              <SaveButton onPress={saveNewLabel} />
            </View>
          )}
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
      {/* </View> */}
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
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
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
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  noitem: {},
});
