import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Alert, StyleSheet, TouchableOpacity } from "react-native";

/**
 * Propreties
 */
type PropsClose = {
  size?: number;
  color?: string;
  onPress: () => void;
  fieldCheck: string[];
};

type PropsCloseGoBack = {
  size?: number;
  color?: string;
  fieldCheck: string[];
};

/**
 * @name Close
 *
 * Display a clickable cross button
 * The default behaviour is to go to the previous page
 *
 * @param size Size of the icon
 * @param color Color of the icon
 * @param onPress Action when button is pressed
 */
export default function Close({
  size = 28,
  color = "#000",
  onPress,
  fieldCheck,
}: PropsClose) {
  const checkThenPress = () => {
    const found = fieldCheck.some((item) => item && item.length > 0);

    if (!found) {
      onPress();
    } else {
      Alert.alert(
        "Attention",
        "Les données non sauvegardé seront perdu voulez vous quitter ?",
        [
          { text: "Oui", onPress: onPress },
          {
            text: "Non",
          },
        ]
      );
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={checkThenPress}>
      <Ionicons name="close-circle-outline" size={size} color={color} />
    </TouchableOpacity>
  );
}

/**
 * @name CloseGoBack
 *
 * Close componement with a go previous screen
 * action
 *
 */
export function CloseGoBack({ size, color, fieldCheck }: PropsCloseGoBack) {
  const router = useRouter();
  const goBack = () => {
    router.back();
  };

  return (
    <Close
      size={size}
      color={color}
      fieldCheck={fieldCheck}
      onPress={goBack}
    ></Close>
  );
}

/**
 * StyleSheet
 */
const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    backgroundColor: "#ef4444DD",
    padding: 4,
  },
});
