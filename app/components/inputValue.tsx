import { StyleSheet, Text, TextInput, View } from "react-native";

type Props = {
  name: string;
  setName: (arg0: string) => void;
  label?: string;
  placeHolder?: string;
  autoFocus?: boolean;
};

export default function InputValue({
  name,
  setName,
  label = "",
  placeHolder = "",
  autoFocus = false,
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
      />
    </View>
  );
}
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
    marginBottom: 25,
  },
});
