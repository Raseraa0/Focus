import { StyleSheet, Text, TextInput, View } from "react-native";

/**
 * Propreties
 */
type PropsInputValue = {
  value: string;
  onChangeText: (arg0: string) => void;
  label?: string;
  placeHolder?: string;
  autoFocus?: boolean;
  numberOfLines?: number;
  isSearch?: boolean;
};

/**
 * @name InputValue
 *
 * Display an input field, whth a label juste above, and
 * an onChange text
 *
 * @param value Value of the input field
 * @param onChangeText Function from UseState to update name variable
 * @param label Text displayed just above the input field
 * @param placeHolder Place holder of the input field
 * @param autoFocus Decide if focus on this input when entering the screen
 * @param numberOfLines Height of the field
 * @param isSearch If the search icon is shown
 */

export function InputValue({
  value,
  onChangeText,
  label = "",
  placeHolder = "",
  autoFocus = false,
  numberOfLines = 1,
  isSearch = false,
}: PropsInputValue) {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeHolder}
        value={value}
        onChangeText={onChangeText}
        autoFocus={autoFocus}
        // multiline={numberOfLines !== 1}
        numberOfLines={numberOfLines}
        textAlignVertical="top"
      />
    </View>
  );
}

/**
 * StyleSheet
 */
const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "#f4f4f4",
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
  },
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
