import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";

/**
 * Propreties
 */
type PropsClose = {
  size?: number;
  color?: string;
  onPress: () => void;
};

type PropsCloseGoBack = {
  size?: number;
  color?: string;
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
}: PropsClose) {
  // Router for navigation
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
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
export function CloseGoBack({ size, color }: PropsCloseGoBack) {
  const router = useRouter();
  const goBack = () => {
    router.back();
  };

  return <Close size={size} color={color} onPress={goBack}></Close>;
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
