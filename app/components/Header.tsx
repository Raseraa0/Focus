import { StyleSheet, Text, View } from "react-native";
import { CloseGoBack } from "./Close";

/**
 * Propreties
 */
type PropsheaderTitle = {
  title: string;
};

type PropsHeaderWithClose = {
  title: string;
  fieldCheck: string[];
};

/**
 * @name HeaderTitle
 *
 * Display a text with a title format
 *
 * @param title Text for the title
 */
export function HeaderTitle({ title }: PropsheaderTitle) {
  return (
    <View>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
}

/**
 * @name HeaderWithClose
 *
 * Display a header, composed of a title
 * and a close button
 *
 * @param title Text for the title
 */
export default function HeaderWithClose({
  title,
  fieldCheck,
}: PropsHeaderWithClose) {
  return (
    <View style={styles.header}>
      <HeaderTitle title={title} />
      <CloseGoBack fieldCheck={fieldCheck} />
    </View>
  );
}

/**
 * StyleSheet
 */
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
