import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";

/**
 * Propreties
 */
type Props = {
  size?: number;
  color?: string;
  onPress?: () => void;
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
export default function Close({ size = 28, color = "#000", onPress }: Props) {
  // Router for navigation
  const router = useRouter();

  return (
    <TouchableOpacity onPress={onPress ?? (() => router.back())}>
      <Ionicons name="close-circle-outline" size={size} color={color} />
    </TouchableOpacity>
  );
}
