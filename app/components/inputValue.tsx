import { StyleSheet, Text, TextInput, View } from "react-native";

/**
 * Propreties
 */
type Props = {
  name: string;
  setName: (arg0: string) => void;
  label?: string;
  placeHolder?: string;
  autoFocus?: boolean;
  numberOfLines?: number;
};

/**
 * @name InputValue
 *
 * Display an input field, whth a label juste above, and
 * a capacity to auto-update the data value when typing
 *
 * @param name Value of the input field
 * @param setName Function from UseState to update name variable
 * @param label Text displayed just above the input field
 * @param placeHolder Place holder of the input field
 * @param autoFocus Decide if focus on this input when entering the screen
 * @param numberOfLines TODO
 */
export default function InputValue({
  name,
  setName,
  label = "",
  placeHolder = "",
  autoFocus = false,
  numberOfLines = 1,
}: Props) {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeHolder}
        value={name}
        onChangeText={setName}
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
});
