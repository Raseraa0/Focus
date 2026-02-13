import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";

type Props = {
  size?: number;
  color?: string;
  onPress?: () => void;
};

export default function Close({ size = 28, color = "#000", onPress }: Props) {
  const router = useRouter();

  return (
    <TouchableOpacity onPress={onPress ?? (() => router.back())}>
      <Ionicons name="close-circle-outline" size={size} color={color} />
    </TouchableOpacity>
  );
}
