import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TextInput, View } from "react-native";

type Props = {
  value: string;
  handleSearch: (arg0: string) => void;
  placeHolder?: string;
};

export default function SearchBar({
  value,
  handleSearch,
  placeHolder = "",
}: Props) {
  return (
    <View style={styles.searchContainer}>
      <Ionicons
        name="search"
        size={20}
        color="#888"
        style={styles.searchIcon}
      />
      <TextInput
        style={styles.searchInput}
        placeholder={placeHolder}
        value={value}
        onChangeText={handleSearch} // Filtre en temps réel
        clearButtonMode="while-editing" // Optionnel (iOS seulement)
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    marginTop: 40,
  },
  searchIcon: { marginRight: 10 },
  searchInput: {
    flex: 1,
    height: 45,
    fontSize: 16,
  },
});
