import { StyleSheet, Text, TouchableOpacity } from "react-native";

/**
 * Propreties
 */
type PropsButtonMy = {
  text?: string;
  bgColor?: "" | "green" | "blue";
  onPress: () => void;
};

type PropsSaveButton = {
  onPress: () => void;
};

type PropsOpenPopupButton = {
  text: string;
  setShowPopup: (arg0: boolean) => void;
};

/**
 * @name ButtonMy
 *
 * Simple button whith action on press
 *
 * @param text Text to displayed on the button
 * @param bgColor Color of the button
 * @param onPress Action to execute when clicking the button
 */
export function ButtonMy({ text = "", bgColor = "", onPress }: PropsButtonMy) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        bgColor === "green" && styles.greenBg,
        bgColor === "blue" && styles.blueBg,
      ]}
      onPress={onPress}
    >
      <Text style={styles.text}>{text}</Text>

      {/* <Ionicons name="add-circle-sharp" color="#fff" size={24}></Ionicons> */}
    </TouchableOpacity>
  );
}

/**
 * @name SaveButton
 *
 * Button for saving
 *
 */
// export function SaveButton({ onPress }: PropsSaveButton) {
//   return (
//     <ButtonMy bgColor="green" text="Sauvegarder" onPress={onPress}></ButtonMy>
//   );
// }

/**
 * @name openPopupButton
 *
 * Button for saving
 *
 */
// export function OpenPopupButton({
//   setShowPopup,
//   text = "",
// }: PropsOpenPopupButton) {
//   return (
//     <ButtonMy
//       bgColor="blue"
//       text={text}
//       onPress={() => {
//         Keyboard.dismiss();
//         setTimeout(() => {
//           setShowPopup(true);
//         }, 100);
//         // setShowPopup(true);
//       }}
//     ></ButtonMy>
//   );
// }

/**
 * StyleSheet
 */
const styles = StyleSheet.create({
  greenBg: {
    backgroundColor: "#34C759",
  },

  blueBg: {
    backgroundColor: "#22d3ee",
  },

  button: {
    backgroundColor: "#575757",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
  },

  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
